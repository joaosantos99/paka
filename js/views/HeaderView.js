import CategoryModel from '/js/models/CategoryModel.js';
import LocalStorageCRUD from '/js/utilities/crud.js';
import UserModel from '/js/models/UserModel.js';

export default class HeaderModel {
  constructor() {
    // Select the <body> element from the DOM
    this.body = document.querySelector('body');
    this.lightHeaderContainer = document.getElementById('lightHeaderContainer');
    const userId = LocalStorageCRUD.read('user');
    this.user = UserModel.getByPk(userId);
    if (document.querySelector('header')) {
      document.querySelector('header').remove();
    }

    // Insert the header HTML string returned by getTemplate()
    // right after the opening <body> tag, before any other content
    if (this.lightHeaderContainer) {
      this.lightHeaderContainer.innerHTML = this.getTemplate();
    } else {
      this.body.insertAdjacentHTML('afterbegin', this.getTemplate());
    }
  }

  getMenuItems() {
    const categories = CategoryModel.getAll();
    return categories.map(category => `<li><a href="/html/category.html?category=${category.name}" class="text-sm">${category.name}</a></li>`).join('');
  }

  getTemplate = () => `
    <header class="sm:py-7 py-6">
      <!-- Main navigation container -->
      <nav class="flex items-center gap-5 justify-between max-w-7xl px-4 mx-auto">
        <!-- Logo link -->
        <a href="/">
          ${this.lightHeaderContainer ? '<img src="/img/light-logo.svg" alt="Logo" />' : '<img src="/img/black-logo.svg" alt="Logo" />'}
        </a>

        <!-- Desktop menu items (hidden on small screens) -->
        <ul class="sm:flex hidden gap-6 items-center ${this.lightHeaderContainer ? 'text-[var(--screen-bg)]' : 'text-[var(--off-black)]'}">
          ${this.getMenuItems()}
          <li><a href="/html/contacts.html" class="text-sm">Contacts</a></li>
        </ul>

        <!-- User icon for desktop, toggle icon for mobile -->
        <div class="flex items-center gap-6">
          ${this.user.isAdmin ? `
            <a class="text-sm bg-[var(--secondary-color)] text-white rounded-md px-4 py-2" href="/html/admin/packs.html">
              Admin Dashboard
            </a>
          ` : ''}
          <a href="${this.user.id ? '/html/profile/settings.html' : '/html/login.html'}">
            <img
              ${this.lightHeaderContainer ? 'src="/img/icon/ic-user-light.svg"' : 'src="/img/icon/ic-user.svg"'}
              alt="User Icon"
              class="sm:block hidden"
            />
          </a>
          <button class="sm:hidden block">
            <img
              ${this.lightHeaderContainer ? 'src="/img/icon/ic-toggle-light.svg"' : 'src="/img/icon/ic-toggle.svg"'}
              alt="Toggle Icon"
              class="sm:hidden block"
              />
            </button>
        </div>
      </nav>
    </header>
  `;
}

// Instantiate the model to trigger header injection
new HeaderModel();
