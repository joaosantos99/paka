import UserModel from '/js/models/UserModel.js';

export default class LoginView {
  constructor() {
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Get form elements
    const form = document.querySelector('form');

    // Add form submit handler
    form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    // Basic validation
    if (!this.validateForm(data)) {
      return;
    }

    try {
      const user = UserModel.getByField('email', data.email);
      if (!user) {
        alert('Invalid email or password');
        return;
      }

      if (user.password !== data.password) {
        alert('Invalid email or password');
        return;
      }

      window.location.href = '/';
      localStorage.setItem('user', JSON.stringify(user.id));
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  validateForm(data) {
    if (!data.email || !data.password) {
      alert('Please fill in all fields');
      return false;
    }

    if (!this.isValidEmail(data.email)) {
      alert('Please enter a valid email address');
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

// Instantiate the view to render the login template into <main>
new LoginView();
