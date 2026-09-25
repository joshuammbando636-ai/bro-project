export interface ContactValues {
  name: string;
  contact: string;
  service: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Accepts +255 7xx xxx xxx, 07xx xxx xxx and other international numbers
const PHONE = /^\+?\d{9,15}$/;

export function isValidContact(value: string) {
  const v = value.trim();
  return EMAIL.test(v) || PHONE.test(v.replace(/[\s\-().]/g, ""));
}

/** Shared by the client form and the API route so rules never drift apart. */
export function validateContact(v: ContactValues, serviceValues: string[]): ContactErrors {
  const errors: ContactErrors = {};
  if (v.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!v.contact.trim()) errors.contact = "Add a phone number or email so we can reply.";
  else if (!isValidContact(v.contact)) errors.contact = "Enter a valid phone number (e.g. 0712 345 678) or email address.";
  if (!serviceValues.includes(v.service)) errors.service = "Choose the service you need.";
  if (v.message.trim().length < 10) errors.message = "Tell us a little more (at least 10 characters).";
  else if (v.message.length > 3000) errors.message = "Please keep your message under 3,000 characters.";
  return errors;
}
