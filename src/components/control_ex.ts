export class ShipThrottle extends HTMLElement {
  static get observedAttributes() {
    return ['power'];
  }
  power = 0;

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    if (name === 'power') {
      this.power = Number(newVal);
      this.render();
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot!.innerHTML = `
      <style>div { font: 16px monospace; }</style>
      <div>Throttle Power: ${this.power}%</div>
    `;
  }
}
customElements.define('ship-throttle', ShipThrottle);
