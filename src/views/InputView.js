import { INPUTS_TYPES } from '@constants/InputConstants';

export class InputView extends HTMLElement {
  constructor() {
    super();
    this.value = '';
    this.type = 'text';
    this.placeholder = 'Placeholder';
    this.error = null;
  }

  connectedCallback() {
    this.value = this.getAttribute('value') || this.value;
    this.type = this.getAttribute('type') || this.type;
    this.placeholder = this.getAttribute('placeholder') || this.placeholder;
    this.error = this.getAttribute('error') || this.error;

    this.render();
  }

  render() {
    this.innerHTML = `
      <label class="text-brand-black text-sm flex flex-col">
        <input
          class="
          bg-brand-white p-3.5 rounded-md w-full outline outline-brand-black m-2px text-brand-black
            placeholder:text-brand-grey
            focus:outline-brand-orange focus:outline-2 focus:text-brand-orange
            ${this.error ? 'outline-1 outline-red-600 text-red-600' : ''}
          "
          value="${this.value}"
          type="${this.type}"
          placeholder="${this.placeholder}"
        />
        ${this.error ? `<span class="text-red-600 text-sm mt-2">${this.error}</span>` : ''}
      </label>
    `;
  }


  setController(controller) {
    this.controller = controller;
  }
}

customElements.define('input-component', InputView);
