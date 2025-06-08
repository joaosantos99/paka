export default class HeaderModel {
  constructor() {
    // Select the <body> element from the DOM
    this.body = document.querySelector('body');

    // Insert the header HTML string returned by getTemplate()
    // right after the opening <body> tag, before any other content
    this.body.insertAdjacentHTML('afterbegin', this.getTemplate());
  }

  getTemplate = () => `
    <header class="sm:py-7 py-6">
      <!-- Main navigation container -->
      <nav class="flex items-center gap-5 justify-between max-w-7xl px-4 mx-auto">
        <!-- Logo link -->
        <a href="#">
          <img src="/img/light-logo.svg" alt="Logo" />
        </a>

        <!-- Desktop menu items (hidden on small screens) -->
        <ul class="sm:flex hidden gap-6 items-center text-[var(--screen-bg)]">
          <li><a href="#" class="text-sm">Mountains</a></li>
          <li><a href="#" class="text-sm">Water</a></li>
          <li><a href="#" class="text-sm">Deserts</a></li>
          <li><a href="#" class="text-sm">Forests</a></li>
          <li><a href="#" class="text-sm">Contacts</a></li>
        </ul>

        <!-- User icon for desktop, toggle icon for mobile -->
        <a href="#">
          <img
            src="/img/icon/ic-user-light.svg"
            alt="User Icon"
            class="sm:block hidden"
          />
          <img
            src="/img/icon/ic-toggle-light.svg"
            alt="Toggle Icon"
            class="sm:hidden block"
          />
        </a>
      </nav>
    </header>
  `;
}

// Instantiate the model to trigger header injection
new HeaderModel();
