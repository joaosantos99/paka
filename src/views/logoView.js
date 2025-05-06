export class Logo extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <img class="logo" src="https://example.com/logo.png" alt="Logo">
    `;
  }

}

customElements.define('logo-component', Logo);
