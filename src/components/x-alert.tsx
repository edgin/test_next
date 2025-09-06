export type AlertType = 'info' | 'warning' | 'error';

export class XAlert extends HTMLElement {
  static get observedAttributes() {
    return ['message', 'type', 'open'];
  }

  message = '';
  type: AlertType = 'info';
  open = false;

  #root: ShadowRoot;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.#render();
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null) {
    if (name === 'message') this.message = value ?? '';
    if (name === 'type') this.type = (value as AlertType) ?? 'info';
    if (name === 'open') this.open = value !== null && value !== 'false';
    this.#render();
  }

  setMessage(v: string) {
    this.message = v;
    this.#reflect('message', v);
    this.#render();
  }
  setType(v: AlertType) {
    this.type = v;
    this.#reflect('type', v);
    this.#render();
  }
  setOpen(v: boolean) {
    this.open = v;
    this.#reflectBool('open', v);
    this.#render();
  }

  close() {
    this.setOpen(false);
    this.dispatchEvent(
      new CustomEvent('x-close', {
        bubbles: true,
        detail: { closedAt: Date.now() },
      }),
    );
  }

  #reflect(name: string, v: string) {
    this.setAttribute(name, v);
  }
  #reflectBool(name: string, v: boolean) {
    v ? this.setAttribute(name, '') : this.removeAttribute(name);
  }

  #render() {
    this.#root.innerHTML = /* html */ `
        <style>
            :host { display: ${this.open ? 'block' : 'none'}; font: 14px/1.4 ui-sans-serif, system-ui; }
            .box { padding: 12px 14px; border-radius: 8px; }
            .info { background: #eef6ff; color:#0b63c5; }
            .warning { background: #fff7e6; color:#a66300; }
            .error { background: #ffecec; color:#b00020; }
            button { all: unset; cursor:pointer; margin-left:8px; }
        </style>
        <div class="box ${this.type}">
            <slot name="icon">⚠️</slot>
            <span>${this.message}</span>
            <button part="close" aria-label="Close">✖</button>
            <slot></slot>
        </div>
        `;
    this.#root
      .querySelector('button')
      ?.addEventListener('click', () => this.close(), { once: true });
  }
}
