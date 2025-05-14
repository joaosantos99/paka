import { 
  BUTTONS_SIZE,
  BUTTONS_SIZE_CLASSES,
  BUTTONS_STYLE,
  BUTTONS_STYLE_CLASSES,
} from '@constants/ButtonConstants';

export class ButtonView extends HTMLElement {
  constructor() {
    super();
    this.size = BUTTONS_SIZE.DEFAULT;
    this.style = BUTTONS_STYLE.PRIMARY;
    // this.onClick = () => {};
    // this.disabled = false;
  }

  connectedCallback() {
    this.size = this.getAttribute('size') || this.size;
    this.style = this.getAttribute('style') || this.style;

    // this.addEventListener("click", () => this.controller.handleButtonClick())
    this.render();
  }

  render() {
    this.innerHTML = `
      <button  
        class="
          py-3.5 rounded-md text-base
          ${BUTTONS_SIZE_CLASSES[this.size]}
          ${BUTTONS_STYLE_CLASSES[this.style]}
        "
      >${this.textContent}</button>
    `;
  }

  setController(controller) {
    this.controller = controller;
  }
}

customElements.define('button-component', ButtonView);