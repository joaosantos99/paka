import FormHandler from '/js/utilities/formHandler.js';

export default class ModalView {
  constructor({ title, fields, onSubmit, message }) {
    this.title = title;
    this.fields = fields;
    this.onSubmit = onSubmit;
    this.message = message;
    this.modalContainer = null;
    this.modalContent = null;
    this.backdrop = null;
    this.isOpen = false;
    this.boundHandleSubmit = this.handleSubmit.bind(this);
    this.boundHandleClose = this.handleClose.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    // Hide modal first
    this.modalContainer.classList.add('hidden');
    document.body.style.overflow = '';
    this.isOpen = false;

    // Handle form submission
    FormHandler.handleFormSubmit(form, this.onSubmit);

    // Finally clean up
    this.modalContainer.remove();
    this.modalContainer = null;
    this.modalContent = null;
    this.backdrop = null;
  }

  handleClose() {
    this.hide();
  }

  initialize() {
    // Remove any existing modal
    const existingModal = document.querySelector('.modal-backdrop');
    if (existingModal) {
      existingModal.remove();
    }

    // Create modal container
    this.modalContainer = document.createElement('div');
    this.modalContainer.className = 'fixed inset-0 z-50 hidden';
    this.modalContainer.innerHTML = this.getTemplate();
    document.body.appendChild(this.modalContainer);

    // Cache DOM elements
    this.modalContent = this.modalContainer.querySelector('.modal-content');
    this.backdrop = this.modalContainer.querySelector('.modal-backdrop');

    // Add event listeners
    const form = this.modalContainer.querySelector('form');
    const closeButton = this.modalContainer.querySelector('.modal-close');

    form.addEventListener('submit', this.boundHandleSubmit);
    closeButton.addEventListener('click', this.boundHandleClose);
  }

  getTemplate() {
    return `
      <div class="modal-backdrop relative min-h-screen bg-[var(--primary-color)]/75 flex items-center justify-center">
        <section class="p-4 w-full flex items-center justify-center">
          <div class="bg-white py-8 px-6 rounded-md max-w-[410px] w-full">
            <!-- Modal Header -->
            <div class="flex items-center gap-3 justify-between">
              <h4 class="text-3xl font-semibold">${this.title}</h4>
              <button type="button" class="modal-close cursor-pointer">
                <img src="../../img/icon/ic-close.svg" alt="Modal Close Icon" />
              </button>
            </div>

            <!-- Modal Body -->
            <div class="mt-8">
              <form>
                ${this.fields ? FormHandler.generateFormFields(this.fields) : this.message}

                <!-- Modal Footer -->
                <div class="mt-6">
                  ${this.onSubmit ? `
                  <button
                    type="submit"
                    class="bg-[var(--secondary-color)] text-white rounded-md h-12 px-10 w-full cursor-pointer"
                  >
                    Submit
                  </button>
                  ` : ''}
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  show(options = {}) {
    this.initialize();

    // Update title if provided
    if (options.title) {
      this.modalContent.querySelector('h4').textContent = options.title;
    }

    // Update button text if provided
    if (options.buttonText) {
      this.modalContent.querySelector('button[type="submit"]').textContent = options.buttonText;
    }

    this.modalContainer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    this.isOpen = true;
  }

  hide() {
    if (!this.modalContainer) return;

    this.modalContainer.classList.add('hidden');
    document.body.style.overflow = '';
    this.isOpen = false;

    // Clean up the current modal
    this.modalContainer.remove();
    this.modalContainer = null;
    this.modalContent = null;
    this.backdrop = null;
  }

  destroy() {
    if (!this.modalContainer) return;

    // Remove all event listeners
    const form = this.modalContainer.querySelector('form');
    const closeButton = this.modalContainer.querySelector('.modal-close');

    // Clone and replace elements to remove event listeners
    if (form) {
      const newForm = form.cloneNode(true);
      form.parentNode.replaceChild(newForm, form);
    }

    if (closeButton) {
      const newCloseButton = closeButton.cloneNode(true);
      closeButton.parentNode.replaceChild(newCloseButton, closeButton);
    }

    // Remove the modal from DOM
    this.modalContainer.remove();

    // Clear references
    this.modalContainer = null;
    this.modalContent = null;
    this.backdrop = null;
  }

  isModalOpen() {
    return this.isOpen;
  }
}
