export class Button extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.textContent = 'Test Button';
  }

  render() {
    this.innerHTML = `
      <button>${this.textContent}</button>
    `;
  }

}

customElements.define('button-component', Button);
