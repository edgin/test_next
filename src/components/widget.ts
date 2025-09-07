// Kitchen-sink Web Component demo
// Features: Shadow DOM, slots, parts, reflection, events, form-associated, methods, keyboard, a11y

type Mode = 'info' | 'success' | 'warning' | 'error';
type ChangeDetail = { value: string; count: number };
type ToggleDetail = { open: boolean };

const sheet = new CSSStyleSheet();

sheet.replaceSync(`
:host {
  --x-bg: #f8fafc;
  --x-fg: #0f172a;
  --x-border: #cbd5e1;
  --x-accent: #3b82f6;

  display: block;
  border: 1px solid var(--x-border);
  border-radius: 12px;
  background: var(--x-bg);
  color: var(--x-fg);
  font: 14px/1.4 system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
}

:host([mode="success"]) { --x-bg:#ecfdf5; --x-border:#10b981; --x-accent:#059669; }
:host([mode="warning"]) { --x-bg:#fffbeb; --x-border:#f59e0b; --x-accent:#d97706; }
:host([mode="error"])   { --x-bg:#fef2f2; --x-border:#ef4444; --x-accent:#dc2626; }

.wrapper { padding: 12px; display: grid; gap: 10px; }
.header   { display:flex; align-items:center; justify-content:space-between; }
.title    { font-weight: 600; }

.controls { display:flex; gap: 8px; align-items:center; }

[part="button"] {
  appearance: none; border: 1px solid var(--x-border); background: white;
  padding: 6px 10px; border-radius: 10px; cursor: pointer;
}
[part="button"]:focus-visible { outline: 2px solid var(--x-accent); outline-offset: 2px; }

.content  { display: grid; gap: 8px; }
.footer   { font-size: 12px; color: #475569; }

.hidden { display: none; }
`);

const BaseHTMLElement: typeof HTMLElement =
  (typeof globalThis !== 'undefined' && (globalThis as any).HTMLElement) || (class {} as any);

export class XDemoWidget extends BaseHTMLElement {
  static formAssociated = true; // participates in <form>
  static get observedAttributes() {
    return ['open', 'count', 'mode', 'value', 'name'];
  }

  #root: ShadowRoot;
  #internals: ElementInternals | null = null;

  // internal state
  #open = true;
  #count = 0;
  #mode: Mode = 'info';
  #value = '';
  #name = '';

  // ======== properties (reflect to attributes) ========
  get open() {
    return this.#open;
  }
  set open(v: boolean) {
    const b = Boolean(v);
    if (b !== this.#open) {
      this.#open = b;
      this.#reflectBool('open', b);
      this.#render();
      this.#emit<ToggleDetail>('x-toggle', { open: b });
    }
  }

  get count() {
    return this.#count;
  }
  set count(v: number) {
    const n = Number(v) || 0;
    if (n !== this.#count) {
      this.#count = n;
      this.#reflectString('count', String(n));
      this.#render();
      this.#emit<ChangeDetail>('x-change', { value: this.#value, count: this.#count });
    }
  }

  get mode(): Mode {
    return this.#mode;
  }
  set mode(m: Mode) {
    const normalized: Mode = m ?? 'info';
    if (normalized !== this.#mode) {
      this.#mode = normalized;
      this.#reflectString('mode', normalized);
      this.#render();
    }
  }

  get value() {
    return this.#value;
  }
  set value(v: string) {
    const s = v ?? '';
    if (s !== this.#value) {
      this.#value = s;
      this.#reflectString('value', s);
      this.#setFormValue();
      this.#render();
      this.#emit<ChangeDetail>('x-change', { value: this.#value, count: this.#count });
    }
  }

  get name() {
    return this.#name;
  }
  set name(n: string) {
    const s = n ?? '';
    if (s !== this.#name) {
      this.#name = s;
      this.#reflectString('name', s);
      this.#setFormValue();
    }
  }

  // ======== lifecycle ========
  constructor() {
    super();
    this.#root = this.attachShadow({ mode: 'open' });
    (this.#root as any).adoptedStyleSheets = [sheet];

    // a11y baseline
    this.setAttribute('role', 'group');
    this.tabIndex = 0; // focusable for keyboard
    try {
      // secure context only
      this.#internals = (this as any).attachInternals?.();
    } catch {
      /* ignore for older browsers */
    }
  }

  connectedCallback() {
    this.#render();
    this.addEventListener('keydown', this.#onKeydown);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.#onKeydown);
  }

  attributeChangedCallback(name: string, _old: string | null, val: string | null) {
    switch (name) {
      case 'open':
        this.#open = val !== null;
        break; // boolean attr presence
      case 'count':
        this.#count = Number(val) || 0;
        break; // number
      case 'mode':
        this.#mode = (val as Mode) || 'info';
        break; // enum
      case 'value':
        this.#value = val ?? '';
        this.#setFormValue();
        break; // string + form
      case 'name':
        this.#name = val ?? '';
        this.#setFormValue();
        break;
    }
    this.#render();
  }

  // ======== public methods ========
  openPanel() {
    this.open = true;
  }
  closePanel() {
    this.open = false;
  }
  reset() {
    this.count = 0;
    this.value = '';
  }

  // ======== events ========
  #emit<T>(type: string, detail: T) {
    this.dispatchEvent(
      new CustomEvent<T>(type, {
        detail,
        bubbles: true,
        composed: true, // cross shadow boundary so React/parents can listen
      }),
    );
  }

  // ======== keyboard ========
  #onKeydown = (e: KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.open = !this.open;
    }
    if (e.key === 'ArrowUp') {
      this.count = this.count + 1;
    }
    if (e.key === 'ArrowDown') {
      this.count = Math.max(0, this.count - 1);
    }
  };

  // ======== rendering ========
  #render() {
    const hidden = this.#open ? '' : 'hidden';
    const ariaExpanded = String(this.#open);

    this.#root.innerHTML = `
      <div class="wrapper" part="container" aria-expanded="${ariaExpanded}">
        <div class="header">
          <div class="title">
            <slot name="header">X Demo Widget</slot>
          </div>
          <div class="controls">
            <button part="button" type="button" data-action="dec" aria-label="Decrease">–</button>
            <span>${this.#count}</span>
            <button part="button" type="button" data-action="inc" aria-label="Increase">+</button>
            <button part="button" type="button" data-action="toggle" aria-pressed="${!this.#open}">${this.#open ? 'Hide' : 'Show'}</button>
          </div>
        </div>

        <div class="content ${hidden}">
          <slot>Default content. Current value: <strong>${this.#escape(this.#value)}</strong></slot>
          <label>
            <span>Value:</span>
            <input part="input" type="text" value="${this.#escape(this.#value)}" />
          </label>
        </div>

        <div class="footer">
          <slot name="footer">Mode: <strong>${this.#mode}</strong></slot>
        </div>
      </div>
    `;

    const root = this.#root;
    root
      .querySelector('[data-action="inc"]')
      ?.addEventListener('click', () => (this.count = this.count + 1));
    root
      .querySelector('[data-action="dec"]')
      ?.addEventListener('click', () => (this.count = Math.max(0, this.count - 1)));
    root
      .querySelector('[data-action="toggle"]')
      ?.addEventListener('click', () => (this.open = !this.open));
    root.querySelector<HTMLInputElement>('input[part="input"]')?.addEventListener('input', (ev) => {
      const v = (ev.currentTarget as HTMLInputElement).value;
      this.value = v;
    });
  }

  // ======== helpers ========
  #reflectString(name: string, value: string | null) {
    if (value === null || value === undefined) this.removeAttribute(name);
    else this.setAttribute(name, value);
  }
  #reflectBool(name: string, on: boolean) {
    on ? this.setAttribute(name, '') : this.removeAttribute(name);
  }
  #escape(s: string) {
    return s.replace(
      /[&<>"']/g,
      (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]!,
    );
  }
  #setFormValue() {
    if (!this.#internals) return;
    const submitValue = this.#value; // could be File, FormData, etc.
    this.#internals.setFormValue(submitValue, this.#name || undefined);
  }
}

// Safe define (browser only & define-once)
if (typeof window !== 'undefined' && 'customElements' in window) {
  if (!customElements.get('x-demo-widget')) {
    customElements.define('x-demo-widget', XDemoWidget as unknown as CustomElementConstructor);
  }
}
