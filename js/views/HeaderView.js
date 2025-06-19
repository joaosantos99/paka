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

    // Initialize mobile menu functionality
    this.initMobileMenu();
  }

  getMenuItems() {
    const categories = CategoryModel.getAll();
    return categories.map(category => `<li><a href="/html/category.html?category=${category.name}" class="text-sm">${category.name}</a></li>`).join('');
  }

  initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('translate-x-0');
        mobileMenu.classList.toggle('-translate-x-full');
        mobileMenuOverlay.classList.toggle('hidden');
        document.body.classList.toggle('overflow-hidden');
      });

      // Close menu when clicking close button
      if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
          mobileMenu.classList.remove('translate-x-0');
          mobileMenu.classList.add('-translate-x-full');
          mobileMenuOverlay.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        });
      }

      // Close menu when clicking overlay
      if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', () => {
          mobileMenu.classList.remove('translate-x-0');
          mobileMenu.classList.add('-translate-x-full');
          mobileMenuOverlay.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        });
      }

      // Close menu when clicking on menu items
      const mobileMenuItems = mobileMenu.querySelectorAll('a');
      mobileMenuItems.forEach(item => {
        item.addEventListener('click', () => {
          mobileMenu.classList.remove('translate-x-0');
          mobileMenu.classList.add('-translate-x-full');
          mobileMenuOverlay.classList.add('hidden');
          document.body.classList.remove('overflow-hidden');
        });
      });
    }
  }

  getTemplate = () => `
    <header class="sm:py-7 py-6 relative">
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
          ${this?.user?.isAdmin ? `
            <a class="text-sm bg-[var(--secondary-color)] text-white rounded-md px-4 py-2 sm:block hidden" href="/html/admin/packs.html">
              Admin Dashboard
            </a>
          ` : ''}
          <a href="${this?.user?.id ? '/html/profile/settings.html' : '/html/login.html'}">
            <img
              ${this.lightHeaderContainer ? 'src="/img/icon/ic-user-light.svg"' : 'src="/img/icon/ic-user.svg"'}
              alt="User Icon"
              class="sm:block hidden"
            />
          </a>
          <button class="mobile-menu-toggle sm:hidden block">
            <img
              ${this.lightHeaderContainer ? 'src="/img/icon/ic-toggle-light.svg"' : 'src="/img/icon/ic-toggle.svg"'}
              alt="Toggle Icon"
              class="sm:hidden block"
              />
          </button>
        </div>
      </nav>

      <!-- Mobile Menu Overlay -->
      <div class="mobile-menu-overlay fixed inset-0 bg-black/50 z-40 hidden transition-opacity duration-300 sm:hidden"></div>

      <!-- Mobile Menu -->
      <div class="mobile-menu fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform -translate-x-full transition-transform duration-300 ease-in-out sm:hidden">
        <div class="flex flex-col h-full">
          <!-- Mobile Menu Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-[var(--off-black)]">Menu</h2>
            <button class="mobile-menu-close p-2">
              <img src="/img/icon/ic-close.svg" alt="Close" class="w-6 h-6" />
            </button>
          </div>

          <!-- Mobile Menu Items -->
          <nav class="flex-1 p-6">
            <ul class="space-y-4">
              ${this.getMenuItems()}
              <li><a href="/html/contacts.html" class="text-sm block py-2 text-[var(--off-black)] hover:text-[var(--secondary-color)] transition-colors">Contacts</a></li>
            </ul>
          </nav>

          <!-- Mobile Menu Footer -->
          <div class="p-6 border-t border-gray-200">
            ${this?.user?.isAdmin ? `
              <a class="block w-full text-center text-sm bg-[var(--secondary-color)] text-white rounded-md px-4 py-3 mb-4" href="/html/admin/packs.html">
                Admin Dashboard
              </a>
            ` : ''}
            <a href="${this?.user?.id ? '/html/profile/settings.html' : '/html/login.html'}" class="flex items-center gap-3 text-sm text-[var(--off-black)] hover:text-[var(--secondary-color)] transition-colors">
              <img
                src="/img/icon/ic-user.svg"
                alt="User Icon"
                class="w-5 h-5"
              />
              <span>${this?.user?.id ? 'Profile Settings' : 'Login'}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  `;
}

// Instantiate the model to trigger header injection
new HeaderModel();
