export default class SignUpView {
  constructor() {
    this.main = document.querySelector('main');
    this.main.innerHTML = this.getTemplate();
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
      img.src = '/img/icon/ic-eye-open.svg';
      img.alt = 'Hide Password';
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      fullName: formData.get('fname'),
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
      console.log('Form submitted with data:', data);
      window.location.href = '/html/login.html';
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  validateForm(data) {
    if (!data.fullName || !data.email || !data.password || !data.confirmPassword) {
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

  getTemplate() {
    return `
      <section>
        <div class="grid md:grid-cols-2 login-hero">
          <div class="flex justify-center items-center px-4">
            <div class="sm:w-96 w-full mx-auto">
              <h4 class="text-3xl font-semibold text-center mb-4">Sign Up</h4>
              <form>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full"
                  placeholder="Full Name"
                />

                <input
                  type="email"
                  name="email"
                  id="email"
                  class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full mt-2"
                  placeholder="Email"
                />

                <div class="relative">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm mt-2 w-full pe-10"
                    placeholder="Password"
                  />
                  <div class="absolute top-6 right-4 bg-[var(--screen-bg)] cursor-pointer toggle-password">
                    <img src="/img/icon/ic-eye-closed.svg" alt="Show Password" />
                  </div>
                </div>

                <div class="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm mt-2 w-full pe-10"
                    placeholder="Confirm Password"
                  />
                  <div class="absolute top-6 right-4 bg-[var(--screen-bg)] cursor-pointer toggle-password">
                    <img src="/img/icon/ic-eye-closed.svg" alt="Show Password" />
                  </div>
                </div>

                <button
                  type="submit"
                  class="bg-[var(--secondary-color)] text-white rounded-md h-12 px-10 my-4 w-full cursor-pointer"
                >
                  Create Account
                </button>

                <div class="text-sm text-center">
                  Already have an account?
                  <a href="/html/login.html" class="font-medium text-[var(--secondary-color)]">
                    Login
                  </a>
                </div>
              </form>
            </div>
          </div>

          <div
            class="!bg-no-repeat !bg-cover !bg-center md:flex items-center justify-center hidden"
            style="background: url(/img/login-hero-bg.png)"
          >
            <h1 class="xl:text-6xl text-5xl text-white font-semibold w-2/3 mx-auto">
              Adventure awaits those willing to wander.
            </h1>
          </div>
        </div>
      </section>
    `;
  }
}

new SignUpView();