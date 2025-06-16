import LocalStorageCRUD from '/js/utilities/crud.js';
import UserModel from '/js/models/UserModel.js';

class ProfileSettingsView {
  constructor() {
    const userId = LocalStorageCRUD.read('user');
    this.user = UserModel.getByPk(userId);

    this.render();
    this.setupEventListeners();
  }

  render() {
    const main = document.querySelector('main');
    main.innerHTML = `
            <!-- Profile Settings Section Start -->
            <div class="relative overflow-x-hidden">
                <section class="max-w-7xl px-4 mx-auto">
                    <div class="mt-8 flex justify-between items-center flex-col">
                        <div class="text-center">
                            <img src="/img/user-profile.svg" alt="User Profile" class="mx-auto" />
                            <h4 class="text-5xl font-semibold">${this.user.name}</h4>
                            <h3 class="text-lg">${this.user.email}</h3>
                        </div>

                        <div class="p-4 rounded-xl bg-[var(--light-bg-color)] lg:flex hidden items-center gap-4 mt-10">
                            <img src="/img/icon/ic-filled-globe.svg" alt="Filled Globe Img" />
                            <img src="/img/icon/ic-empty-globe.svg" alt="Empty Globe Img" />
                            <img src="/img/icon/ic-empty-globe.svg" alt="Empty Globe Img" />
                            <img src="/img/icon/ic-empty-globe.svg" alt="Empty Globe Img" />
                            <img src="/img/icon/ic-empty-globe.svg" alt="Empty Globe Img" />
                            <img src="/img/icon/ic-empty-globe.svg" alt="Empty Globe Img" />
                            <img src="/img/icon/ic-empty-globe.svg" alt="Empty Globe Img" />
                        </div>
                    </div>
                </section>
            </div>

            <div class="max-w-7xl px-4 mx-auto mb-20">
                <ul class="sm:flex hidden gap-2 justify-center mt-16 mb-12 overflow-x-auto w-full">
                    <li>
                        <a href="/html/profile/settings.html">
                            <button type="button" data-tab="settings"
                                class="border border-[var(--secondary-color)] py-2 px-8 rounded-md rounded-e-none cursor-pointer bg-[var(--secondary-color)] text-white font-medium w-36">
                                Settings
                            </button>
                        </a>
                    </li>

                    <li>
                      <a href="/html/profile/reservation.html">
                        <button type="button" data-tab="reservations"
                            class="border border-[var(--primary-color)] py-2 px-8 cursor-pointer font-medium w-36">
                                Reservations
                        </button>
                      </a>
                    </li>

                    <li>
                    <a href="/html/profile/badges.html">
                        <button type="button" data-tab="badges"
                            class="border border-[var(--primary-color)] py-2 px-8 cursor-pointer font-medium rounded-e-md w-36">
                                Badges
                        </button>
                    </a>
                    </li>
                </ul>

                <div class="sm:w-96 w-full mx-auto">
                    <form id="profileForm">
                        <input
                            type="text"
                            name="fname"
                            id="fname"
                            class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full"
                            placeholder="Full Name"
                            value="${this.user.name}"
                        />

                        <input
                            type="email"
                            name="email"
                            id="email"
                            class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full mt-2"
                            placeholder="Email"
                            value="${this.user.email}"
                        />

                        <input
                            type="password"
                            name="password"
                            id="password"
                            class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm my-2 w-full"
                            placeholder="Password"
                        />

                        <button type="submit"
                            class="bg-[var(--secondary-color)] text-white rounded-md h-12 px-10 mt-2 w-full cursor-pointer">
                            Update
                        </button>
                    </form>
                </div>
            </div>
            <!-- Profile Settings Section End -->
        `;
  }

  handleProfileUpdate(e) {
    e.preventDefault();
    const formData = {
      fullName: document.getElementById('fname').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };
    console.log('Profile update data:', formData);
    // Implement profile update functionality here
  }

  handleTabChange(button) {
    // Remove active state from all tabs
    const allTabs = document.querySelectorAll('[data-tab]');
    allTabs.forEach(tab => {
      tab.classList.remove('bg-[var(--secondary-color)]', 'text-white');
      tab.classList.add('border-[var(--primary-color)]');
    });

    // Add active state to clicked tab
    button.classList.add('bg-[var(--secondary-color)]', 'text-white');
    button.classList.remove('border-[var(--primary-color)]');

    // Here you would typically handle the content change based on the tab
    const tabName = button.dataset.tab;
    console.log('Switching to tab:', tabName);
    // Implement tab content switching functionality here
  }

  setupEventListeners() {
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => this.handleProfileUpdate(e));
    }

    const tabButtons = document.querySelectorAll('[data-tab]');
    tabButtons.forEach(button => {
      button.addEventListener('click', () => this.handleTabChange(button));
    });
  }
}

// Initialize the view when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProfileSettingsView();
});

export default ProfileSettingsView;