import { CERTIFICATION_OPTIONS } from "@/lib/content";
import {
  EMAIL_ERROR,
  PHONE_ERROR,
  isValidEmail,
  isValidPhone,
  normalizeEmail,
  phoneDigits,
} from "@/lib/fields";

// The one validator for the lead fields (landing-page-forms §4c): the form's
// submit gate and useMegaLeadForm.submit() both decide with it. Email and phone
// rules live only in lib/fields (canonical lp-starter file).

export type FieldKey =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "certificationSought";

export type LeadFields = Record<FieldKey, string>;

export type FieldErrors = Partial<Record<FieldKey, string>>;

// The declared lead fields, in form (DOM) order: every one is validated, and
// the form focuses the first that fails.
export const FIELD_ORDER: readonly FieldKey[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "certificationSought",
];

const TEXT_MAX_LENGTH = 200;
const TEXT_TOO_LONG_ERROR = `Use ${TEXT_MAX_LENGTH} characters or fewer.`;

export class LeadValidationError extends Error {
  readonly errors: FieldErrors;

  constructor(errors: FieldErrors) {
    super(Object.values(errors).join(" "));
    this.name = "LeadValidationError";
    this.errors = errors;
  }
}

export function isDeclaredCertification(value: string): boolean {
  return CERTIFICATION_OPTIONS.includes(value);
}

function validateText(
  value: string,
  requiredMessage: string
): string | undefined {
  const trimmed = value.trim();

  if (!trimmed) return requiredMessage;

  return trimmed.length > TEXT_MAX_LENGTH
    ? TEXT_TOO_LONG_ERROR
    : undefined;
}

export function validateField(
  key: FieldKey,
  value: string
): string | undefined {
  switch (key) {
    case "firstName":
      return validateText(value, "First name is required.");

    case "lastName":
      return validateText(value, "Last name is required.");

    case "email":
      if (!value.trim()) return "Email address is required.";
      return isValidEmail(value) ? undefined : EMAIL_ERROR;

    case "phone":
      // PHONE IS OPTIONAL: only a blank value skips validation.
      if (!value.trim()) return undefined;
      return isValidPhone(value) ? undefined : PHONE_ERROR;

    case "certificationSought":
      return isDeclaredCertification(value)
        ? undefined
        : "Please select a certification.";
  }
}

export function validateLead(data: LeadFields): FieldErrors {
  const errors: FieldErrors = {};

  FIELD_ORDER.forEach((key) => {
    const err = validateField(key, data[key]);

    if (err) {
      errors[key] = err;
    }
  });

  return errors;
}

// A missing field is blank. Any other non-string is rejected outright and never
// coerced, so a stray value cannot be stringified into, or out of, validity.
function readFields(input: Record<string, unknown>): LeadFields {
  const fields = {} as LeadFields;

  FIELD_ORDER.forEach((key) => {
    const value = input[key] ?? "";

    if (typeof value !== "string") {
      throw new LeadValidationError({ [key]: `${key} must be text.` });
    }

    fields[key] = value;
  });

  return fields;
}

/** Throws LeadValidationError on any invalid field; otherwise returns the
 *  normalized fields: trimmed names, canonical email, phone as 10 digits or "". */
export function parseLead(input: Record<string, unknown>): LeadFields {
  const fields = readFields(input);
  const errors = validateLead(fields);

  if (Object.keys(errors).length > 0) {
    throw new LeadValidationError(errors);
  }

  return {
    firstName: fields.firstName.trim(),
    lastName: fields.lastName.trim(),
    email: normalizeEmail(fields.email),
    // PHONE REMAINS OPTIONAL: blank stays "", otherwise the 10 digits.
    phone: fields.phone.trim() ? phoneDigits(fields.phone) : "",
    certificationSought: fields.certificationSought,
  };
}
