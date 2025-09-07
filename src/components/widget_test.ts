export class XDemoWidgetTest extends HTMLElement {
  #root: ShadowRoot;
  constructor() {
    super();
    this.#root = this.attachShadow({ mode: 'open' });
    this.#root.innerHTML = `<div>Test Widget x</div>`;
  }
}

if (!customElements.get('x-demo-widget-test')) {
  customElements.define('x-demo-widget-test', XDemoWidgetTest);
}
