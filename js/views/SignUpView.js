import UserModel from '/js/models/UserModel.js';

export default class SignUpView {
  constructor() {
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Get form elements
    const form = document.querySelector('form');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');

    // Add form submit handler
    form.addEventListener('submit', this.handleSubmit.bind(this));

    // Add password toggle functionality
    togglePasswordButtons.forEach((button, index) => {
      button.addEventListener('click', () => this.togglePasswordVisibility(passwordInputs[index], button));
    });
  }

  togglePasswordVisibility(input, button) {
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);

    // Toggle eye icon
    const img = button.querySelector('img');
    if (type === 'password') {
      img.src = '/img/icon/ic-eye-closed.svg';
      img.alt = 'Show Password';
    } else {
      img.src = '/img/icon/ic-eye-closed.svg';
      img.alt = 'Hide Password';
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      name: formData.get('fname'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword')
    };

    // Basic validation
    if (!this.validateForm(data)) {
      return;
    }

    try {
      // Here you would typically make an API call to register the user
      // For now, we'll just simulate success
      UserModel.create(data);
      window.location.href = '/html/login.html';
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  validateForm(data) {
    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      alert('Please fill in all fields');
      return false;
    }

    if (!this.isValidEmail(data.email)) {
      alert('Please enter a valid email address');
      return false;
    }

    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return false;
    }

    if (data.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return false;
    }

    return true;
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

new SignUpView();