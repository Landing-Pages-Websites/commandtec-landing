"use client";

import { useRef, useState } from "react";
import { useMegaLeadForm } from "@/hooks/useMegaLeadForm";
import {
  CTA,
  PHONE,
  CERTIFICATION_OPTIONS,
  BUDGET_OPTIONS,
} from "@/lib/content";
import { Icon } from "@/components/icons";

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

const EMAIL_RE =
  /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;

// NANP: area code & exchange each start 2-9 and may not be an N11.
const NANP_RE =
  /^[2-9](?!11)\d{2}[2-9](?!11)\d{2}\d{4}$/;

const NOT_SURE = "Not sure yet";
const BUDGET_LOW = "Under $15,000";
const BUDGET_HIGH = "$28,000 or more";

const SUBMIT_ERROR_MESSAGE = `Something went wrong sending your request. Please try again, or call us at ${PHONE}.`;

type FieldKey =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "certificationSought"
  | "estimatedBudget"
  | "smsConsent";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  certificationSought: string;
  estimatedBudget: string;
  smsConsent: boolean;
}

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  certificationSought: "",
  estimatedBudget: "",
  smsConsent: false,
};

type FieldErrors = Partial<Record<FieldKey, string>>;

const REQUIRED_ORDER: FieldKey[] = [
  "firstName",
  "lastName",
  "email",
  "certificationSought",
  "estimatedBudget",
  "smsConsent",
];

function validateField(
  key: FieldKey,
  value: string | boolean
): string | undefined {
  switch (key) {
    case "firstName":
      return typeof value === "string" && value.trim()
        ? undefined
        : "First name is required.";

    case "lastName":
      return typeof value === "string" && value.trim()
        ? undefined
        : "Last name is required.";

    case "email": {
      const v = String(value).trim();

      if (!v) return "Email address is required.";
      if (!EMAIL_RE.test(v)) {
        return "Please enter a valid email address.";
      }

      return undefined;
    }

    case "phone": {
      const digits = String(value).replace(/\D/g, "");

      // PHONE IS OPTIONAL.
      if (!digits) return undefined;

      if (digits.length !== 10) {
        return "Please enter a valid 10-digit phone number.";
      }

      if (!NANP_RE.test(digits)) {
        return "Please enter a valid US phone number.";
      }

      return undefined;
    }

    case "certificationSought":
      return value
        ? undefined
        : "Please select a certification.";

    case "estimatedBudget":
      return value
        ? undefined
        : "Please select an estimated budget.";

    case "smsConsent":
      return value === true
        ? undefined
        : "Please check the box to consent to receive SMS/text messages.";
  }
}

function validateAll(data: FormState): FieldErrors {
  const errors: FieldErrors = {};

  REQUIRED_ORDER.forEach((key) => {
    const err = validateField(key, data[key]);

    if (err) {
      errors[key] = err;
    }
  });

  // Phone is optional, but validate it when provided.
  const phoneError = validateField("phone", data.phone);

  if (phoneError) {
    errors.phone = phoneError;
  }

  return errors;
}

// Reporting-only qualification — NEVER blocks or alters submit.
function computeQualified(
  cert: string,
  budget: string
): boolean {
  if (cert === NOT_SURE) return true;
  if (budget === BUDGET_LOW) return false;
  if (cert === "ISO") return true;
  if (cert === "CMMI") return budget === BUDGET_HIGH;

  return false;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (!digits) return "";

  if (digits.length <= 3) {
    return `(${digits}`;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }

  return `(${digits.slice(0, 3)}) ${digits.slice(
    3,
    6
  )}-${digits.slice(6)}`;
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
  heading = "Tell us your required standard and deadline.",
  subheading = "We'll scope the consulting work and discuss timing in your free consultation.",
  submitLabel = CTA.primary,
  routeSlug,
  thankYouBody = "Thank you. A CommandTec practitioner will reach out to schedule your free consultation, identify the standard your opportunity requires, and scope the engagement — with no obligation.",
}: FormCardProps): React.ReactElement {
  const { submit } = useMegaLeadForm();

  const [data, setData] = useState<FormState>(INITIAL);
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
    key: keyof FormState,
    value: string | boolean
  ): void => {
    setData((current) => ({
      ...current,
      [key]: value,
    }));

    setErrors((previous) => {
      if (!(key in previous)) {
        return previous;
      }

      const fieldKey = key as FieldKey;

      if (!previous[fieldKey]) {
        return previous;
      }

      const error = validateField(fieldKey, value);

      if (error) {
        return previous;
      }

      const next = {
        ...previous,
      };

      delete next[fieldKey];

      return next;
    });
  };

  const markTouched = (
    key: FieldKey,
    currentValue: string | boolean
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

  const fireTracking = (
    qualified: boolean,
    cert: string,
    budget: string
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
      estimated_budget: budget,
      sms_consent: true,
    };

    window.MegaTag?.trackEvent?.(
      "form_submit",
      payload
    );

    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "form_submit",
      ...payload,
    });

    if (qualified) {
      window.MegaTag?.trackEvent?.(
        "qualified_lead",
        payload
      );

      window.dataLayer.push({
        event: "qualified_lead",
        ...payload,
      });
    }
  };

  const focusFirstBad = (
    allErrors: FieldErrors
  ): void => {
    const firstBad = REQUIRED_ORDER.find(
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

  const handleValidateAndSubmit =
    async (): Promise<void> => {
      if (
        inFlightRef.current ||
        submitting ||
        submitted
      ) {
        return;
      }

      const allErrors = validateAll(data);

      if (Object.keys(allErrors).length > 0) {
        setErrors(allErrors);

        setTouched({
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          certificationSought: true,
          estimatedBudget: true,
          smsConsent: true,
        });

        focusFirstBad(allErrors);

        return;
      }

      inFlightRef.current = true;
      setSubmitting(true);
      setSubmitError(null);

      const qualified = computeQualified(
        data.certificationSought,
        data.estimatedBudget
      );

      try {
        const res = await submit({
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          email: data.email.trim(),

          // PHONE REMAINS OPTIONAL.
          phone: data.phone
            ? data.phone.replace(/\D/g, "")
            : "",

          certificationSought:
            data.certificationSought,

          estimatedBudget:
            data.estimatedBudget,

          // SMS CONSENT.
          smsConsent: data.smsConsent,

          qualified,

          route_slug:
            routeSlug ||
            (typeof window !== "undefined"
              ? window.location.pathname
              : "/"),
        });

        // A 2xx with a body that is not {ok:true} is still a dropped lead.
        // Only a confirmed success fires conversions and shows the thank-you card.
        if (res?.ok !== true) {
          throw new Error("Submission not confirmed by server.");
        }

        fireTracking(
          qualified,
          data.certificationSought,
          data.estimatedBudget
        );

        setSubmitted(true);
      } catch (err) {
        console.error(
          "Lead submission failed:",
          err
        );

        // The visitor is fine, but the LEAD would be dropped: surface a
        // retryable error and fire NO tracking so we never bill a phantom
        // conversion.
        setSubmitError(SUBMIT_ERROR_MESSAGE);
      } finally {
        setSubmitting(false);
        inFlightRef.current = false;
      }
    };

  const onSubmitClick = (): void => {
    handleValidateAndSubmit().catch(() => {
      // handleValidateAndSubmit handles its own errors via submitError state.
    });
  };

  const handleNativeSubmit = (
    event: React.FormEvent
  ): void => {
    event.preventDefault();
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
      onSubmit={handleNativeSubmit}
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

      <div className="space-y-2 p-5 md:space-y-3.5 md:p-7">
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
              ref={(element) => {
                fieldRefs.current.firstName =
                  element;
              }}
              id={`${idPrefix}-firstName`}
              name="firstName"
              type="text"
              required
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
              ref={(element) => {
                fieldRefs.current.lastName =
                  element;
              }}
              id={`${idPrefix}-lastName`}
              name="lastName"
              type="text"
              required
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
            ref={(element) => {
              fieldRefs.current.email =
                element;
            }}
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            required
            pattern="[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}"
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

          <input
            ref={(element) => {
              fieldRefs.current.phone =
                element;
            }}
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="Phone (10 digits)"
            value={data.phone}
            onChange={(event) =>
              update(
                "phone",
                formatPhone(event.target.value)
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
              ref={(element) => {
                fieldRefs.current.certificationSought =
                  element;
              }}
              id={`${idPrefix}-certificationSought`}
              name="certificationSought"
              required
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

        {/* Estimated budget */}
        <div>
          <label
            htmlFor={`${idPrefix}-estimatedBudget`}
            className="sr-only"
          >
            What is your estimated budget?
          </label>

          <div className="relative">
            <select
              ref={(element) => {
                fieldRefs.current.estimatedBudget =
                  element;
              }}
              id={`${idPrefix}-estimatedBudget`}
              name="estimatedBudget"
              required
              value={data.estimatedBudget}
              onChange={(event) => {
                update(
                  "estimatedBudget",
                  event.target.value
                );

                markTouched(
                  "estimatedBudget",
                  event.target.value
                );
              }}
              onBlur={(event) =>
                markTouched(
                  "estimatedBudget",
                  event.target.value
                )
              }
              className={`${inputCls(
                "estimatedBudget"
              )} appearance-none pr-9 ${
                data.estimatedBudget
                  ? ""
                  : "text-[var(--color-muted)]"
              }`}
              aria-invalid={
                showErr(
                  "estimatedBudget"
                ) || undefined
              }
              aria-describedby={
                showErr(
                  "estimatedBudget"
                )
                  ? errId(
                      "estimatedBudget"
                    )
                  : undefined
              }
              disabled={submitting}
            >
              <option value="">
                What is your estimated budget?
              </option>

              {BUDGET_OPTIONS.map(
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
            "estimatedBudget"
          ) && (
            <p
              id={errId(
                "estimatedBudget"
              )}
              role="alert"
              aria-live="polite"
              className="lp-field-error"
            >
              {errors.estimatedBudget}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={onSubmitClick}
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

        {/* SMS CONSENT */}
        <div
          className={`rounded-md border p-4 ${
            showErr("smsConsent")
              ? "border-red-500 bg-red-50"
              : "border-[var(--color-border)] bg-[var(--color-bg)]"
          }`}
        >
          <div className="flex items-start gap-3">
            <input
              ref={(element) => {
                fieldRefs.current.smsConsent =
                  element;
              }}
              id={`${idPrefix}-smsConsent`}
              name="smsConsent"
              type="checkbox"
              checked={data.smsConsent}
              onChange={(event) => {
                update(
                  "smsConsent",
                  event.target.checked
                );

                markTouched(
                  "smsConsent",
                  event.target.checked
                );
              }}
              onBlur={() =>
                markTouched(
                  "smsConsent",
                  data.smsConsent
                )
              }
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-accent)]"
              aria-invalid={
                showErr("smsConsent") ||
                undefined
              }
              aria-describedby={`${idPrefix}-smsConsent-description${
                showErr("smsConsent")
                  ? ` ${errId("smsConsent")}`
                  : ""
              }`}
              disabled={submitting}
            />

            <label
              htmlFor={`${idPrefix}-smsConsent`}
              id={`${idPrefix}-smsConsent-description`}
              className="cursor-pointer text-xs leading-relaxed text-[var(--color-muted)]"
            >
              I agree to receive SMS/text messages
              from CommandTec regarding my inquiry,
              consultation scheduling, reminders, and
              service-related updates. Message frequency
              varies. Message and data rates may apply.
              Reply <strong>STOP</strong> to opt out or{" "}
              <strong>HELP</strong> for help. Consent is
              not a condition of purchase. View our{" "}
              <a
                href="/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--color-primary)] underline underline-offset-2 hover:text-[var(--color-primary-hover)]"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="/terms-and-conditions/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--color-primary)] underline underline-offset-2 hover:text-[var(--color-primary-hover)]"
              >
                Terms &amp; Conditions
              </a>
              .
            </label>
          </div>

          {showErr("smsConsent") && (
            <p
              id={errId("smsConsent")}
              role="alert"
              aria-live="polite"
              className="lp-field-error mt-2"
            >
              {errors.smsConsent}
            </p>
          )}
        </div>

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
