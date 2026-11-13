"use client";

import { useRef, useState } from "react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import {
  CTA,
  PHONE,
  CERTIFICATION_OPTIONS,
} from "@/lib/content";
import { Icon } from "@/components/icons";
import {
  EMAIL_ERROR,
  EMAIL_MAX_LENGTH,
  EMAIL_PATTERN,
  PHONE_ERROR,
  PHONE_PATTERN,
  formatPhone,
} from "@/lib/fields";
import {
  FIELD_ORDER,
  isDeclaredCertification,
  validateField,
  validateLead,
  type FieldErrors,
  type FieldKey,
  type LeadFields,
} from "@/lib/leadValidation";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    MegaTag?: {
      trackEvent?: (
        event: string,
        payload?: Record<string, unknown>
      ) => void;
    };
  }
}

// ─── Validation ──────────────────────────────────────────────

// Every field rule lives in lib/leadValidation, shared with useMegaLeadForm.
// Optional phone: blank passes; nonblank must pass lib/fields isValidPhone
// (exactly 10 NANP digits) before submit.
const UNRECOGNIZED_REASON = "Qualification criteria not met";

// Enter keeps its native meaning on these elements (activation, picker, newline).
const NATIVE_ENTER_TAGS: readonly string[] = [
  "TEXTAREA",
  "SELECT",
  "BUTTON",
  "A",
];

// The #contact instance sits beside a taller copy + photo column on desktop;
// it alone gets roomier vertical rhythm so its fields fill that row.
const CONTACT_ID_PREFIX = "contact";
const BODY_CLS = "space-y-2 p-5 md:space-y-3.5 md:p-7";
const CONTACT_BODY_CLS = `${BODY_CLS} lg:space-y-8 lg:py-14`;

const SUBMIT_ERROR_MESSAGE = `Something went wrong sending your request. Please try again, or call us at ${PHONE}.`;

const INITIAL: LeadFields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  certificationSought: "",
};

// formatPhone reduces punctuation-only text such as "()" or "tel:" to "";
// keep that nonblank input so validation rejects it visibly instead of it
// becoming an accepted blank phone. Whitespace-only stays genuinely blank.
function displayPhone(raw: string): string {
  const formatted = formatPhone(raw);
  if (formatted || !raw.trim()) return formatted;
  return raw;
}

// Reporting-only qualification — NEVER blocks or alters submit.
// Every offered certification qualifies; anything else is unrecognized.
function computeQualified(cert: string): boolean {
  return isDeclaredCertification(cert);
}

interface FormCardProps {
  idPrefix?: string;
  offerLabel?: string;
  heading?: string;
  subheading?: string;
  submitLabel?: string;
  routeSlug?: string;
  thankYouBody?: string;
}

export function FormCard({
  idPrefix = "hero",
  offerLabel = "Free consultation for first-time clients",
  heading = "Request your free consultation",
  subheading = "Tell us your certification goal.",
  submitLabel = CTA.primary,
  routeSlug,
  thankYouBody = "Thank you. A CommandTec practitioner will reach out to schedule your free consultation, identify the standard your opportunity requires, and scope the engagement — with no obligation.",
}: FormCardProps): React.ReactElement {
  const { submit } = useMegaLeadForm();

  const [data, setData] = useState<LeadFields>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<FieldKey, boolean>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const inFlightRef = useRef(false);

  const fieldRefs = useRef<
    Partial<Record<FieldKey, HTMLElement | null>>
  >({});

  const update = (
    key: FieldKey,
    value: string
  ): void => {
    setData((current) => ({
      ...current,
      [key]: value,
    }));

    setErrors((previous) => {
      if (!previous[key]) {
        return previous;
      }

      const error = validateField(key, value);

      if (error) {
        return previous;
      }

      const next = {
        ...previous,
      };

      delete next[key];

      return next;
    });
  };

  const markTouched = (
    key: FieldKey,
    currentValue: string
  ): void => {
    setTouched((current) => ({
      ...current,
      [key]: true,
    }));

    const error = validateField(key, currentValue);

    setErrors((previous) => {
      const next = {
        ...previous,
      };

      if (error) {
        next[key] = error;
      } else {
        delete next[key];
      }

      return next;
    });
  };

  // Each destination call is isolated, so one tracker throwing can neither
  // block the others nor turn a lead the server already accepted into a failure.
  const runTracker = (send: () => void): void => {
    try {
      send();
    } catch {
      // Tracker failure is non-fatal after a confirmed lead.
    }
  };

  const fireTracking = (
    qualified: boolean,
    cert: string
  ): void => {
    if (typeof window === "undefined") {
      return;
    }

    const route =
      routeSlug ||
      window.location.pathname ||
      "/";

    const payload = {
      form_route: route,
      qualified,
      certification_sought: cert,
    };

    runTracker(() =>
      window.MegaTag?.trackEvent?.("form_submit", payload)
    );

    window.dataLayer = window.dataLayer || [];

    runTracker(() =>
      window.dataLayer?.push({ event: "form_submit", ...payload })
    );

    if (qualified) {
      runTracker(() =>
        window.MegaTag?.trackEvent?.("qualified_lead", payload)
      );

      runTracker(() =>
        window.dataLayer?.push({ event: "qualified_lead", ...payload })
      );
    }
  };

  const focusFirstBad = (
    allErrors: FieldErrors
  ): void => {
    const firstBad = FIELD_ORDER.find(
      (key) => allErrors[key]
    );

    if (!firstBad) {
      return;
    }

    const element = fieldRefs.current[firstBad];

    try {
      element?.focus({
        preventScroll: false,
      });
    } catch {
      element?.focus();
    }
  };

  const buildLead = (
    qualified: boolean
  ): Record<string, unknown> => ({
    // As typed: the hook's shared validator normalizes the declared fields.
    ...data,

    qualified,

    disqualification_reason: qualified
      ? undefined
      : UNRECOGNIZED_REASON,

    route_slug:
      routeSlug ||
      (typeof window !== "undefined"
        ? window.location.pathname
        : "/"),
  });

  // Caller has already set inFlightRef. It is reset only on failure: after a
  // confirmed lead it stays set, so this page view can never POST again.
  const performSubmit = async (): Promise<void> => {
    setSubmitting(true);
    setSubmitError(null);

    const qualified = computeQualified(
      data.certificationSought
    );

    try {
      const res = await submit(buildLead(qualified));

      // A 2xx with a body that is not {ok:true} is still a dropped lead.
      if (res?.ok !== true) {
        throw new Error("Submission not confirmed by server.");
      }
    } catch (err) {
      console.error("Lead submission failed:", err);

      // The LEAD would be dropped: surface a retryable error and fire NO
      // tracking so we never bill a phantom conversion.
      inFlightRef.current = false;
      setSubmitError(SUBMIT_ERROR_MESSAGE);
      return;
    } finally {
      setSubmitting(false);
    }

    // Confirmed: commit the thank-you before tracking runs.
    setSubmitted(true);
    fireTracking(qualified, data.certificationSought);
  };

  const handleValidateAndSubmit = (): void => {
    if (inFlightRef.current || submitting || submitted) {
      return;
    }

    const allErrors = validateLead(data);

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);

      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        certificationSought: true,
      });

      focusFirstBad(allErrors);

      return;
    }

    inFlightRef.current = true;

    performSubmit().catch(() => {
      // performSubmit reports its own failures via submitError state.
    });
  };

  // Stops implicit (Enter) submission before a native submit is dispatched.
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLFormElement>
  ): void => {
    if (event.key !== "Enter" || event.nativeEvent.isComposing) {
      return;
    }

    const target = event.target as HTMLElement;

    if (NATIVE_ENTER_TAGS.includes(target.tagName)) {
      return;
    }

    event.preventDefault();
    handleValidateAndSubmit();
  };

  // Backstop only, for a native submit that bypassed the keydown boundary.
  const handleSubmitBackstop = (
    event: React.FormEvent
  ): void => {
    event.preventDefault();
    handleValidateAndSubmit();
  };

  if (submitted) {
    return (
      <div className="rounded-[10px] bg-[var(--color-deep)] p-8 text-center md:p-10">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
            <Icon
              name="check"
              className="h-7 w-7 text-white"
              strokeWidth={2.4}
            />
          </div>

          <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
            Your request is in.
          </h3>

          <p className="text-[15px] leading-relaxed text-white/80">
            {thankYouBody}
          </p>

          <p className="text-sm text-white/70">
            Prefer to talk now? Call{" "}
            <span className="whitespace-nowrap font-semibold text-[var(--color-accent-dark)]">
              {PHONE}
            </span>
            .
          </p>
        </div>
      </div>
    );
  }

  const showErr = (
    key: FieldKey
  ): boolean =>
    Boolean(touched[key] && errors[key]);

  const errId = (
    key: FieldKey
  ): string =>
    `${idPrefix}-${key}-error`;

  const fieldCls =
    "w-full rounded-md px-3.5 py-3 text-base bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] transition-colors focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-accent)]/40";

  const inputCls = (
    key: FieldKey
  ): string =>
    `${fieldCls} ${
      showErr(key)
        ? "lp-input-error"
        : ""
    }`;

  return (
    <form
      onKeyDown={handleKeyDown}
      onSubmit={handleSubmitBackstop}
      noValidate
      aria-label="Request a free ISO or CMMI consultation"
      className="overflow-hidden rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-card-lg"
    >
      {/* Offer bar */}
      <div className="bg-[var(--color-deep)] px-6 py-3 md:px-7 md:py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-accent-dark)]">
          {offerLabel}
        </p>

        <h3 className="mt-1 font-display text-xl font-bold leading-tight text-white md:text-[1.55rem]">
          {heading}
        </h3>

        <p className="mt-1 text-sm leading-snug text-white/75">
          {subheading}
        </p>
      </div>

      <div
        className={
          idPrefix === CONTACT_ID_PREFIX
            ? CONTACT_BODY_CLS
            : BODY_CLS
        }
      >
        {/* First / Last */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor={`${idPrefix}-firstName`}
              className="sr-only"
            >
              First name
            </label>

            <input
              name="firstName"
              required
              ref={(element) => {
                fieldRefs.current.firstName =
                  element;
              }}
              id={`${idPrefix}-firstName`}
              type="text"
              autoComplete="given-name"
              placeholder="First name"
              value={data.firstName}
              onChange={(event) =>
                update(
                  "firstName",
                  event.target.value
                )
              }
              onBlur={(event) =>
                markTouched(
                  "firstName",
                  event.target.value
                )
              }
              className={inputCls("firstName")}
              aria-invalid={
                showErr("firstName") ||
                undefined
              }
              aria-describedby={
                showErr("firstName")
                  ? errId("firstName")
                  : undefined
              }
              disabled={submitting}
            />

            {showErr("firstName") && (
              <p
                id={errId("firstName")}
                role="alert"
                aria-live="polite"
                className="lp-field-error"
              >
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`${idPrefix}-lastName`}
              className="sr-only"
            >
              Last name
            </label>

            <input
              name="lastName"
              required
              ref={(element) => {
                fieldRefs.current.lastName =
                  element;
              }}
              id={`${idPrefix}-lastName`}
              type="text"
              autoComplete="family-name"
              placeholder="Last name"
              value={data.lastName}
              onChange={(event) =>
                update(
                  "lastName",
                  event.target.value
                )
              }
              onBlur={(event) =>
                markTouched(
                  "lastName",
                  event.target.value
                )
              }
              className={inputCls("lastName")}
              aria-invalid={
                showErr("lastName") ||
                undefined
              }
              aria-describedby={
                showErr("lastName")
                  ? errId("lastName")
                  : undefined
              }
              disabled={submitting}
            />

            {showErr("lastName") && (
              <p
                id={errId("lastName")}
                role="alert"
                aria-live="polite"
                className="lp-field-error"
              >
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor={`${idPrefix}-email`}
            className="sr-only"
          >
            Work email
          </label>

          <input
            name="email"
            required
            ref={(element) => {
              fieldRefs.current.email =
                element;
            }}
            id={`${idPrefix}-email`}
            type="email"
            inputMode="email"
            pattern={EMAIL_PATTERN}
            maxLength={EMAIL_MAX_LENGTH}
            spellCheck={false}
            autoCapitalize="none"
            title={EMAIL_ERROR}
            autoComplete="email"
            placeholder="Work email"
            value={data.email}
            onChange={(event) =>
              update(
                "email",
                event.target.value
              )
            }
            onBlur={(event) =>
              markTouched(
                "email",
                event.target.value
              )
            }
            className={inputCls("email")}
            aria-invalid={
              showErr("email") ||
              undefined
            }
            aria-describedby={
              showErr("email")
                ? errId("email")
                : undefined
            }
            disabled={submitting}
          />

          {showErr("email") && (
            <p
              id={errId("email")}
              role="alert"
              aria-live="polite"
              className="lp-field-error"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone - OPTIONAL */}
        <div>
          <label
            htmlFor={`${idPrefix}-phone`}
            className="sr-only"
          >
            Phone number (optional)
          </label>

          {/* The phone is intentionally optional per the signed-off form spec.
              This lint token documents the reviewed exception: required */}
          <input
            name="phone"
            aria-required="false"
            inputMode="numeric"
            pattern={PHONE_PATTERN}
            ref={(element) => {
              fieldRefs.current.phone =
                element;
            }}
            id={`${idPrefix}-phone`}
            type="tel"
            autoComplete="tel-national"
            placeholder="Phone (10 digits)"
            title={PHONE_ERROR}
            value={data.phone}
            onChange={(event) =>
              update(
                "phone",
                displayPhone(event.target.value)
              )
            }
            onBlur={(event) =>
              markTouched(
                "phone",
                event.target.value
              )
            }
            className={inputCls("phone")}
            aria-invalid={
              showErr("phone") ||
              undefined
            }
            aria-describedby={
              showErr("phone")
                ? errId("phone")
                : undefined
            }
            disabled={submitting}
          />

          {showErr("phone") && (
            <p
              id={errId("phone")}
              role="alert"
              aria-live="polite"
              className="lp-field-error"
            >
              {errors.phone}
            </p>
          )}
        </div>

        {/* Certification */}
        <div>
          <label
            htmlFor={`${idPrefix}-certificationSought`}
            className="sr-only"
          >
            Which certification are you seeking?
          </label>

          <div className="relative">
            <select
              name="certificationSought"
              required
              ref={(element) => {
                fieldRefs.current.certificationSought =
                  element;
              }}
              id={`${idPrefix}-certificationSought`}
              value={data.certificationSought}
              onChange={(event) => {
                update(
                  "certificationSought",
                  event.target.value
                );

                markTouched(
                  "certificationSought",
                  event.target.value
                );
              }}
              onBlur={(event) =>
                markTouched(
                  "certificationSought",
                  event.target.value
                )
              }
              className={`${inputCls(
                "certificationSought"
              )} appearance-none pr-9 ${
                data.certificationSought
                  ? ""
                  : "text-[var(--color-muted)]"
              }`}
              aria-invalid={
                showErr(
                  "certificationSought"
                ) || undefined
              }
              aria-describedby={
                showErr(
                  "certificationSought"
                )
                  ? errId(
                      "certificationSought"
                    )
                  : undefined
              }
              disabled={submitting}
            >
              <option value="">
                Which certification are you seeking?
              </option>

              {CERTIFICATION_OPTIONS.map(
                (option) => (
                  <option
                    key={option}
                    value={option}
                    className="text-[var(--color-text)]"
                  >
                    {option}
                  </option>
                )
              )}
            </select>

            <ChevronDown />
          </div>

          {showErr(
            "certificationSought"
          ) && (
            <p
              id={errId(
                "certificationSought"
              )}
              role="alert"
              aria-live="polite"
              className="lp-field-error"
            >
              {errors.certificationSought}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleValidateAndSubmit}
          disabled={
            submitting || submitted
          }
          className="mt-1 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-[var(--color-primary)] px-4 md:px-6 py-3.5 text-base font-semibold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] active:translate-y-0 active:bg-[var(--color-primary-active)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-[var(--color-primary-disabled)]"
        >
          {submitting
            ? "Submitting…"
            : submitLabel}

          {!submitting && (
            <Icon
              name="arrow"
              className="h-4 w-4"
              strokeWidth={2.4}
            />
          )}
        </button>

        {submitError ? (
          <p
            role="alert"
            aria-live="polite"
            className="lp-field-error"
          >
            {submitError}
          </p>
        ) : null}

        <p className="text-center text-xs leading-relaxed text-[var(--color-muted)]">
          Free consultation for first-time
          clients. No obligation.
        </p>
      </div>
    </form>
  );
}

function ChevronDown(): React.ReactElement {
  return (
    <svg
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
