import ContactModel from '/js/models/ContactModel.js';

class ContactsView {
  constructor() {
    this.setupEventListeners();
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