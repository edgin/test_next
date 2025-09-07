export class XDemoWidgetTest extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'open'];
  }

  #root: ShadowRoot;
  #value = '';
  #open = true;

  // refs for dynamic updates
  #valueEl!: HTMLElement;
  #contentEl!: HTMLElement;

  get value() {
    return this.#value;
  }
  set value(v: string) {
    const s = String(v ?? '');
    if (s !== this.#value) {
      this.#value = s;
      this.reflect('value', s);
      this.render();
    }
  }

  get open() {
    return this.#open;
  }
  set open(b: boolean) {
    const on = !!b;
    if (on !== this.#open) {
      this.#open = on;
      this.reflectBool('open', on);
      this.render();
    }
  }

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: 'open' });

    // Build the shadow DOM ONCE (includes <style> and <slot>s)
    this.#root.innerHTML = `
      <style>
        :host {
          display: block;
          border: 2px solid #6366f1;
          border-radius: 12px;
          padding: 12px;
          font: 14px/1.4 system-ui, sans-serif;
          background: #f8fafc;
        }
        .header { font-weight: 700; margin-bottom: 8px; }
        .content { padding: 8px; background: #ffffff; border-radius: 8px; }
        .footer { margin-top: 8px; font-size: 12px; color: #64748b; }
        /* first-level slotted nodes */
        ::slotted([slot="header"]) { color: #0ea5e9; }
        ::slotted([slot="footer"]) { font-style: italic; }
      </style>

      <div class="header">
        <slot name="header">X Demo</slot>
      </div>

      <div class="content">
        <div>Value: <b id="val"></b></div>
        <slot></slot>
      </div>

      <div class="footer">
        <slot name="footer">Footer</slot>
      </div>
    `;

    this.#valueEl = this.#root.querySelector('#val')!;
    this.#contentEl = this.#root.querySelector('.content')!;
  }

  connectedCallback() {
    // hydrate from initial attributes
    const attrVal = this.getAttribute('value');
    if (attrVal !== null) this.#value = attrVal;
    if (this.hasAttribute('open')) this.#open = true;
    this.render();
  }

  attributeChangedCallback(name: string, _oldV: string | null, newV: string | null) {
    if (name === 'value') this.value = newV ?? '';
    if (name === 'open') this.open = newV !== null;
  }

  private render() {
    // IMPORTANT: do NOT touch shadowRoot.innerHTML again
    this.#valueEl.textContent = this.#value;
    this.#contentEl.style.display = this.#open ? '' : 'none';
  }

  private reflect(name: string, val: string | null) {
    if (val == null) this.removeAttribute(name);
    else this.setAttribute(name, val);
  }
  private reflectBool(name: string, on: boolean) {
    on ? this.setAttribute(name, '') : this.removeAttribute(name);
  }
}

if (!customElements.get('x-demo-widget-test')) {
  customElements.define('x-demo-widget-test', XDemoWidgetTest);
}
