import UserModel from '/js/models/UserModel.js';

export default class LoginView {
  constructor() {
    // Grab the <main> element from the document
    const main = document.querySelector('main');

    // Insert the login template HTML at the beginning of <main>
    main.insertAdjacentHTML('afterbegin', this.getTemplate());
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

  getTemplate = () => `
    <section>
      <div class="grid md:grid-cols-2 login-hero">
        <div class="flex justify-center items-center px-4">
          <div class="sm:w-96 w-full mx-auto">
            <h4 class="text-3xl font-semibold text-center mb-4">
              Login Account
            </h4>
            <form>
              <input
                type="email"
                name="email"
                id="email"
                class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full"
                placeholder="Email"
              />

              <input
                type="password"
                name="password"
                id="password"
                class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm my-2 w-full"
                placeholder="Password"
              />

              <a
                href="/html/recover-pass.html"
                class="font-medium text-sm w-fit ms-auto block"
              >
                Forgot Password?
              </a>

              <button
                type="submit"
                class="bg-[var(--secondary-color)] text-white rounded-md h-12 px-10 my-4 w-full cursor-pointer"
              >
                Login
              </button>

              <div class="text-sm text-center">
                Don’t have an account?
                <a
                  href="../html/sign-up.html"
                  class="font-medium text-[var(--secondary-color)]"
                >
                  Sign Up
                </a>
              </div>
            </form>
          </div>
        </div>

        <div
          class="!bg-no-repeat !bg-cover !bg-center md:flex items-center justify-center hidden"
          style="background: url(../img/login-hero-bg.png)"
        >
          <h1
            class="xl:text-6xl text-5xl text-white font-semibold w-2/3 mx-auto"
          >
            Adventure awaits those willing to wander.
          </h1>
        </div>
      </div>
    </section>
  `;
}

// Instantiate the view to render the login template into <main>
new LoginView();
