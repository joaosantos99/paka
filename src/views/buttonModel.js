export class Button extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <button>Test Button</button>
    `;
  }

}

customElements.define('button-component', Button);
