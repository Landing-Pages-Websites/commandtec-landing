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
      trackEvent?: (event: string, payload?: Record<string, unknown>) => void;
    };
  }
}

// ─── Validation — inline per-field, no native tooltips ───
const EMAIL_RE = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;
// NANP: area code & exchange each start 2-9 and may not be an N11.
const NANP_RE = /^[2-9](?!11)\d{2}[2-9](?!11)\d{2}\d{4}$/;

const NOT_SURE = "Not sure yet";
const BUDGET_LOW = "Under $15,000";
const BUDGET_HIGH = "$28,000 or more";

type FieldKey =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "certificationSought"
  | "estimatedBudget";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  certificationSought: string;
  estimatedBudget: string;
}

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  certificationSought: "",
  estimatedBudget: "",
};

type FieldErrors = Partial<Record<FieldKey, string>>;

const REQUIRED_ORDER: FieldKey[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "certificationSought",
  "estimatedBudget",
];

function validateField(key: FieldKey, value: string): string | undefined {
  switch (key) {
    case "firstName":
      return value.trim() ? undefined : "First name is required.";
    case "lastName":
      return value.trim() ? undefined : "Last name is required.";
    case "email": {
      const v = value.trim();
      if (!v) return "Email address is required.";
      if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
      return undefined;
    }
    case "phone": {
      const digits = value.replace(/\D/g, "");
      if (!digits) return "Phone number is required.";
      if (digits.length !== 10) return "Please enter a valid 10-digit phone number.";
      if (!NANP_RE.test(digits)) return "Please enter a valid US phone number.";
      return undefined;
    }
    case "certificationSought":
      return value ? undefined : "Please select a certification.";
    case "estimatedBudget":
      return value ? undefined : "Please select an estimated budget.";
  }
}

function validateAll(data: FormState): FieldErrors {
  const errors: FieldErrors = {};
  REQUIRED_ORDER.forEach((k) => {
    const err = validateField(k, data[k]);
    if (err) errors[k] = err;
  });
  return errors;
}

// Reporting-only qualification — NEVER blocks or alters the submit.
function computeQualified(cert: string, budget: string): boolean {
  if (cert === NOT_SURE) return true;
  if (budget === BUDGET_LOW) return false;
  if (cert === "ISO") return true;
  if (cert === "CMMI") return budget === BUDGET_HIGH;
  return false;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (!digits) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
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
  heading = "Tell us which standard your contract requires",
  subheading = "We'll identify the exact standard and scope your engagement — at no cost.",
  submitLabel = CTA.primary,
  routeSlug,
  thankYouBody = "Thank you. A CommandTec practitioner will reach out to schedule your free consultation, identify the standard your opportunity requires, and scope the engagement — with no obligation.",
}: FormCardProps): React.ReactElement {
  const { submit } = useMegaLeadForm();

  const [data, setData] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Synchronous re-entrancy guard — blocks duplicate fires from rapid clicks
  // before React re-renders with the disabled state.
  const inFlightRef = useRef(false);
  const fieldRefs = useRef<Partial<Record<FieldKey, HTMLElement | null>>>({});

  const update = (k: keyof FormState, v: string): void => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((prev) => {
      if (!(k in prev)) return prev;
      const key = k as FieldKey;
      if (!prev[key]) return prev;
      const err = validateField(key, v);
      if (err) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const markTouched = (k: FieldKey, currentValue: string): void => {
    setTouched((t) => ({ ...t, [k]: true }));
    const err = validateField(k, currentValue);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[k] = err;
      else delete next[k];
      return next;
    });
  };

  const fireTracking = (
    qualified: boolean,
    cert: string,
    budget: string
  ): void => {
    if (typeof window === "undefined") return;
    const route =
      routeSlug || (typeof window !== "undefined" ? window.location.pathname : "/");
    const payload = {
      form_route: route,
      qualified,
      certification_sought: cert,
      estimated_budget: budget,
    };
    // Mega optimizer event FIRST, then the GTM dataLayer signal — every submit.
    window.MegaTag?.trackEvent?.("form_submit", payload);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "form_submit", ...payload });
    // Qualified-lead optimization event — ONLY when qualified.
    if (qualified) {
      window.MegaTag?.trackEvent?.("qualified_lead", payload);
      window.dataLayer.push({ event: "qualified_lead", ...payload });
    }
  };

  const focusFirstBad = (allErrors: FieldErrors): void => {
    const firstBad = REQUIRED_ORDER.find((k) => allErrors[k]);
    if (!firstBad) return;
    const el = fieldRefs.current[firstBad];
    try {
      (el as HTMLElement | null)?.focus({ preventScroll: false });
    } catch {
      el?.focus();
    }
  };

  // Validate FIRST, then submit. Button is type="button" so the optimizer's
  // capture-phase listener never fires on empty/invalid clicks.
  const handleValidateAndSubmit = async (): Promise<void> => {
    if (inFlightRef.current || submitting || submitted) return;
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
      });
      focusFirstBad(allErrors);
      return;
    }
    inFlightRef.current = true;
    setSubmitting(true);
    const qualified = computeQualified(
      data.certificationSought,
      data.estimatedBudget
    );
    try {
      await submit({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        phone: data.phone.replace(/\D/g, ""),
        certificationSought: data.certificationSought,
        estimatedBudget: data.estimatedBudget,
        qualified,
        route_slug:
          routeSlug ||
          (typeof window !== "undefined" ? window.location.pathname : "/"),
      });
      fireTracking(qualified, data.certificationSought, data.estimatedBudget);
      setSubmitted(true);
    } catch (err) {
      // Still fire tracking + show thank-you so the user isn't stranded.
      fireTracking(qualified, data.certificationSought, data.estimatedBudget);
      setSubmitted(true);
      throw new Error(
        `Lead submission failed: ${err instanceof Error ? err.message : "unknown"}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmitClick = (): void => {
    handleValidateAndSubmit().catch(() => {
      /* thank-you already shown; error surfaced above for logging tools */
    });
  };

  const handleNativeSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
  };

  if (submitted) {
    return (
      <div className="rounded-[10px] bg-[var(--color-deep)] p-8 text-center md:p-10">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
            <Icon name="check" className="h-7 w-7 text-white" strokeWidth={2.4} />
          </div>
          <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
            Your request is in.
          </h3>
          <p className="text-[15px] leading-relaxed text-white/80">
            {thankYouBody}
          </p>
          <p className="text-sm text-white/70">
            Prefer to talk now? Call{" "}
            <span className="font-semibold whitespace-nowrap text-[var(--color-accent-dark)]">
              {PHONE}
            </span>
            .
          </p>
        </div>
      </div>
    );
  }

  const showErr = (k: FieldKey): boolean => Boolean(touched[k] && errors[k]);
  const errId = (k: FieldKey): string => `${idPrefix}-${k}-error`;
  const fieldCls =
    "w-full rounded-md px-3.5 py-3 text-base bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] transition-colors focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-accent)]/40";
  const inputCls = (k: FieldKey): string =>
    `${fieldCls} ${showErr(k) ? "lp-input-error" : ""}`;

  return (
    <form
      onSubmit={handleNativeSubmit}
      noValidate
      aria-label="Request a free ISO or CMMI consultation"
      className="overflow-hidden rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-card-lg"
    >
      {/* Deep-green offer bar */}
      <div className="bg-[var(--color-deep)] px-6 py-4 md:px-7">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-accent-dark)]">
          {offerLabel}
        </p>
        <h3 className="mt-1 font-display text-xl font-bold leading-tight text-white md:text-[1.55rem]">
          {heading}
        </h3>
        <p className="mt-1 text-sm leading-snug text-white/75">{subheading}</p>
      </div>

      <div className="space-y-3.5 p-6 md:p-7">
        {/* First / Last */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor={`${idPrefix}-firstName`} className="sr-only">
              First name
            </label>
            <input
              ref={(el) => {
                fieldRefs.current.firstName = el;
              }}
              id={`${idPrefix}-firstName`}
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              placeholder="First name"
              value={data.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              onBlur={(e) => markTouched("firstName", e.target.value)}
              className={inputCls("firstName")}
              aria-invalid={showErr("firstName") || undefined}
              aria-describedby={showErr("firstName") ? errId("firstName") : undefined}
              disabled={submitting}
            />
            {showErr("firstName") && (
              <p id={errId("firstName")} role="alert" aria-live="polite" className="lp-field-error">
                {errors.firstName}
              </p>
            )}
          </div>
          <div>
            <label htmlFor={`${idPrefix}-lastName`} className="sr-only">
              Last name
            </label>
            <input
              ref={(el) => {
                fieldRefs.current.lastName = el;
              }}
              id={`${idPrefix}-lastName`}
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              placeholder="Last name"
              value={data.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              onBlur={(e) => markTouched("lastName", e.target.value)}
              className={inputCls("lastName")}
              aria-invalid={showErr("lastName") || undefined}
              aria-describedby={showErr("lastName") ? errId("lastName") : undefined}
              disabled={submitting}
            />
            {showErr("lastName") && (
              <p id={errId("lastName")} role="alert" aria-live="polite" className="lp-field-error">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor={`${idPrefix}-email`} className="sr-only">
            Work email
          </label>
          <input
            ref={(el) => {
              fieldRefs.current.email = el;
            }}
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            required
            pattern="[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}"
            autoComplete="email"
            placeholder="Work email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={(e) => markTouched("email", e.target.value)}
            className={inputCls("email")}
            aria-invalid={showErr("email") || undefined}
            aria-describedby={showErr("email") ? errId("email") : undefined}
            disabled={submitting}
          />
          {showErr("email") && (
            <p id={errId("email")} role="alert" aria-live="polite" className="lp-field-error">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor={`${idPrefix}-phone`} className="sr-only">
            Phone
          </label>
          <input
            ref={(el) => {
              fieldRefs.current.phone = el;
            }}
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            required
            inputMode="numeric"
            autoComplete="tel"
            placeholder="Phone (10 digits)"
            value={data.phone}
            onChange={(e) => update("phone", formatPhone(e.target.value))}
            onBlur={(e) => markTouched("phone", e.target.value)}
            className={inputCls("phone")}
            aria-invalid={showErr("phone") || undefined}
            aria-describedby={showErr("phone") ? errId("phone") : undefined}
            disabled={submitting}
          />
          {showErr("phone") && (
            <p id={errId("phone")} role="alert" aria-live="polite" className="lp-field-error">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Certification sought */}
        <div>
          <label htmlFor={`${idPrefix}-certificationSought`} className="sr-only">
            Which certification are you seeking?
          </label>
          <div className="relative">
            <select
              ref={(el) => {
                fieldRefs.current.certificationSought = el;
              }}
              id={`${idPrefix}-certificationSought`}
              name="certificationSought"
              required
              value={data.certificationSought}
              onChange={(e) => {
                update("certificationSought", e.target.value);
                markTouched("certificationSought", e.target.value);
              }}
              onBlur={(e) => markTouched("certificationSought", e.target.value)}
              className={`${inputCls("certificationSought")} appearance-none pr-9 ${data.certificationSought ? "" : "text-[var(--color-muted)]"}`}
              aria-invalid={showErr("certificationSought") || undefined}
              aria-describedby={
                showErr("certificationSought") ? errId("certificationSought") : undefined
              }
              disabled={submitting}
            >
              <option value="">Which certification are you seeking?</option>
              {CERTIFICATION_OPTIONS.map((o) => (
                <option key={o} value={o} className="text-[var(--color-text)]">
                  {o}
                </option>
              ))}
            </select>
            <ChevronDown />
          </div>
          {showErr("certificationSought") && (
            <p
              id={errId("certificationSought")}
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
          <label htmlFor={`${idPrefix}-estimatedBudget`} className="sr-only">
            What is your estimated budget?
          </label>
          <div className="relative">
            <select
              ref={(el) => {
                fieldRefs.current.estimatedBudget = el;
              }}
              id={`${idPrefix}-estimatedBudget`}
              name="estimatedBudget"
              required
              value={data.estimatedBudget}
              onChange={(e) => {
                update("estimatedBudget", e.target.value);
                markTouched("estimatedBudget", e.target.value);
              }}
              onBlur={(e) => markTouched("estimatedBudget", e.target.value)}
              className={`${inputCls("estimatedBudget")} appearance-none pr-9 ${data.estimatedBudget ? "" : "text-[var(--color-muted)]"}`}
              aria-invalid={showErr("estimatedBudget") || undefined}
              aria-describedby={
                showErr("estimatedBudget") ? errId("estimatedBudget") : undefined
              }
              disabled={submitting}
            >
              <option value="">What is your estimated budget?</option>
              {BUDGET_OPTIONS.map((o) => (
                <option key={o} value={o} className="text-[var(--color-text)]">
                  {o}
                </option>
              ))}
            </select>
            <ChevronDown />
          </div>
          {showErr("estimatedBudget") && (
            <p
              id={errId("estimatedBudget")}
              role="alert"
              aria-live="polite"
              className="lp-field-error"
            >
              {errors.estimatedBudget}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onSubmitClick}
          disabled={submitting || submitted}
          className="mt-1 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-[var(--color-primary)] px-6 py-3.5 text-base font-semibold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-[var(--color-primary-hover)] active:translate-y-0 active:bg-[var(--color-primary-active)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-[var(--color-primary-disabled)]"
        >
          {submitting ? "Submitting…" : submitLabel}
          {!submitting && <Icon name="arrow" className="h-4 w-4" strokeWidth={2.4} />}
        </button>

        <p className="text-center text-xs leading-relaxed text-[var(--color-muted)]">
          Free consultation for first-time clients. No obligation.
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
