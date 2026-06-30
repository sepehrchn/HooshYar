export type ContactValidationInput = {
  name?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
  locale?: unknown;
};

export type ValidContactSubmission = {
  name: string;
  email: string;
  service: string;
  message: string;
  locale: 'en' | 'fa';
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactSubmission(input: ContactValidationInput):
  | {ok: true; data: ValidContactSubmission}
  | {ok: false; error: string} {
  const name = typeof input.name === 'string' ? input.name.trim() : '';
  const email = typeof input.email === 'string' ? input.email.trim() : '';
  const service = typeof input.service === 'string' ? input.service.trim() : '';
  const message = typeof input.message === 'string' ? input.message.trim() : '';
  const locale = input.locale === 'fa' ? 'fa' : 'en';

  if (!name) return {ok: false, error: 'Name is required'};
  if (!emailPattern.test(email)) return {ok: false, error: 'Valid email is required'};
  if (!service) return {ok: false, error: 'Service is required'};
  if (message.length < 20) return {ok: false, error: 'Message must be at least 20 characters'};

  return {
    ok: true,
    data: {name, email, service, message, locale}
  };
}
