/**
 * Form helpers: accessible inline validation (on blur + on submit),
 * error summary focus, loading → success states. All submissions are demos.
 */

type Validator = (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => string;

export const messages: Record<string, Validator> = {
  default: (el) => {
    const v = el.validity;
    const name = (el.dataset.label || el.name || 'This field').toLowerCase();
    if (v.valueMissing) return `Please enter your ${name}.`;
    if (v.typeMismatch && el.type === 'email') return 'Please enter a valid email address, e.g. name@example.com.';
    if (v.patternMismatch) return el.dataset.patternMsg || `Please check the format of your ${name}.`;
    if (v.tooShort) return `Please use at least ${(el as HTMLInputElement).minLength} characters.`;
    if (v.rangeUnderflow || v.rangeOverflow) return el.dataset.rangeMsg || `Please choose a valid ${name}.`;
    return '';
  },
};

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export function validateField(el: Field): boolean {
  const wrap = el.closest('.field');
  const err = wrap?.querySelector<HTMLElement>('.field__error');
  const msg = el.checkValidity() ? '' : messages.default(el);
  wrap?.classList.toggle('is-invalid', !!msg);
  el.setAttribute('aria-invalid', msg ? 'true' : 'false');
  if (err) err.textContent = msg;
  return !msg;
}

/** Wire blur validation for every field in a form. Re-validates on input once a field has shown an error. */
export function enhanceForm(form: HTMLFormElement) {
  form.querySelectorAll<Field>('input, select, textarea').forEach((el) => {
    el.addEventListener('blur', () => {
      if (el.value !== '' || el.dataset.touched) validateField(el);
      el.dataset.touched = '1';
    });
    el.addEventListener('input', () => {
      if (el.getAttribute('aria-invalid') === 'true') validateField(el);
    });
  });
}

/** Validate all fields; focus the first invalid one. Returns validity. */
export function validateForm(form: HTMLFormElement, scope: ParentNode = form): boolean {
  const fields = Array.from(scope.querySelectorAll<Field>('input, select, textarea')).filter(
    (f) => !f.disabled && f.type !== 'hidden',
  );
  let first: Field | null = null;
  fields.forEach((f) => {
    if (!validateField(f) && !first) first = f;
  });
  if (first) (first as Field).focus();
  return !first;
}

export function setLoading(btn: HTMLButtonElement | null, loading: boolean) {
  if (!btn) return;
  btn.classList.toggle('is-loading', loading);
  btn.disabled = loading;
  btn.setAttribute('aria-busy', String(loading));
}

export const fakeRequest = (ms = 1100) => new Promise((r) => setTimeout(r, ms));

/* Newsletter (footer and inline) */
export function initNewsletter() {
  document.querySelectorAll<HTMLFormElement>('[data-newsletter]').forEach((form) => {
    const input = form.querySelector<HTMLInputElement>('input[type="email"]');
    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const status = form.querySelector<HTMLElement>('[data-newsletter-status]');
    if (!input) return;
    input.dataset.label = 'email address';
    enhanceForm(form);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateField(input)) {
        input.focus();
        return;
      }
      setLoading(btn, true);
      await fakeRequest(900);
      setLoading(btn, false);
      if (status) {
        status.classList.add('form-status', 'is-success');
        status.textContent = `Thank you. ${input.value} would now be on the list (demo: nothing was stored or sent).`;
      }
      form.reset();
      input.removeAttribute('aria-invalid');
    });
  });
}
