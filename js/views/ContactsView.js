import ContactModel from '/js/models/ContactModel.js';

class ContactsView {
  constructor() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    const main = document.querySelector('main');
    main.innerHTML = `
            <section>
                <div class="grid md:grid-cols-2 login-hero">
                    <div class="!bg-no-repeat !bg-cover !bg-center md:flex items-center justify-center hidden"
                        style="background: url(/img/contact-hero-bg.png)">
                    </div>
                    <div class="flex justify-center items-center px-4 relative">
                        <div class="sm:w-96 w-full mx-auto bg-[var(--screen-bg)] z-[1] relative" id="contact-form-container">
                            <h4 class="text-3xl font-semibold text-center mb-4">Contact Us!</h4>
                            <form id="contactForm">
                                <input type="text" name="fullName" id="fullName"
                                    class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full"
                                    placeholder="Full Name" required />

                                <input type="email" name="email" id="email"
                                    class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm my-2 w-full"
                                    placeholder="Email" required />

                                <textarea name="message" id="message"
                                    class="border rounded-md p-3.5 focus-within:outline-0 text-sm mt-2 w-full resize-none"
                                    rows="5" placeholder="Message" required></textarea>

                                <button type="submit"
                                    class="bg-[var(--secondary-color)] text-white rounded-md h-12 px-10 mt-2 w-full cursor-pointer">
                                    Send Message
                                </button>
                            </form>
                        </div>

                        <img src="/img/cactus-img.png" alt="Cactus Img" class="absolute bottom-0 right-0 -z-0" />
                    </div>
                </div>
            </section>
        `;
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateForm(formData) {
    const errors = [];

    if (!formData.fullName.trim()) {
      errors.push('Full name is required');
    }

    if (!formData.email.trim()) {
      errors.push('Email is required');
    } else if (!this.validateEmail(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    if (!formData.message.trim()) {
      errors.push('Message is required');
    }

    return errors;
  }

  async handleSubmit(e) {
    e.preventDefault();

    const formData = {
      fullName: document.getElementById('fullName').value.trim(),
      email: document.getElementById('email').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    const errors = this.validateForm(formData);

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    try {
      ContactModel.create(formData);

      // Clear the form
      e.target.reset();

      // Show success message
      alert('Thank you for your message! We will get back to you soon.');

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again later.');
    }
  }

  setupEventListeners() {
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }
}

// Initialize the view when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ContactsView();
});

export default ContactsView;