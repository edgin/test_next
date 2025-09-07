export class XDemoWidgetTest extends HTMLElement {
  // observed attributes
  static get observedAttributes() {
    return ['value', 'open'];
  }
  // This private field named root will hold the ShadowRoot object created by attachShadow.
  #root: ShadowRoot;

  // internal state
  #value = '';
  #open = true;

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

  // Construcor
  constructor() {
    super();
    this.#root = this.attachShadow({ mode: 'open' });
    // this.#root.innerHTML = `<div>Test Widget x</div>`;
  }

  // RENDER ON FIRST CONNECT
  connectedCallback() {
    // Apply any initial attributes to internal state
    const attrVal = this.getAttribute('value');
    if (attrVal !== null) this.#value = attrVal;

    const hasOpen = this.hasAttribute('open');
    // If 'open' is present as empty attr => true; if absent => keep default
    if (hasOpen) this.#open = true;

    this.render();
  }

  private render() {
    this.#root.innerHTML = `
      <div ${this.#open ? '' : 'style="display:none"'}>Value: <b>${this.esc(this.#value)}</b> </div>
    `;
  }
  private reflect(name: string, val: string | null) {
    if (val == null) this.removeAttribute(name);
    else this.setAttribute(name, val);
  }
  private reflectBool(name: string, on: boolean) {
    on ? this.setAttribute(name, '') : this.removeAttribute(name);
  }
  private esc(s: string) {
    return s.replace(
      /[&<>"']/g,
      (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]!,
    );
  }
}

// Define the custom element if not already defined
if (!customElements.get('x-demo-widget-test')) {
  customElements.define('x-demo-widget-test', XDemoWidgetTest);
}
