import LocalStorageCRUD from '/js/utilities/crud.js';
import UserModel from '/js/models/UserModel.js';
import ReservationModel from '/js/models/ReservationModel.js';
import PackModel from '/js/models/PackModel.js';

class ProfileSettingsView {
  constructor() {
    const userId = LocalStorageCRUD.read('user');
    this.user = UserModel.getByPk(userId);

    this.render();
    this.setupEventListeners();
  }

  render() {
    document.getElementById('profileName').textContent = this.user.name;
    document.getElementById('profileEmail').textContent = this.user.email;

    this.fillForm();
    this.renderBadges();
  }

  hydrateView() {
    this.user = UserModel.getByPk(this.user.id);
    this.render();
  }

  fillForm() {
    document.getElementById('fname').value = this.user.name;
    document.getElementById('email').value = this.user.email;
  }

  handleProfileUpdate(e) {
    e.preventDefault();
    const formData = {
      name: document.getElementById('fname').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };

    UserModel.update(this.user.id, formData);
    this.hydrateView();
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

  renderBadges() {
    const reservations = ReservationModel.getByUserId(this.user.id);
    const reservationsWithPacks = reservations.map(reservation => {
      const pack = PackModel.getByPk(reservation.packId);
      return {
        ...reservation,
        pack
      };
    });

    const continents = reservationsWithPacks.map(reservation => reservation.pack.continent);
    const categories = reservationsWithPacks.map(reservation => reservation.pack.categories);

    const uniqueContinents = [...new Set(continents)];
    const uniqueCategories = [...new Set(categories.flat())];

    const badges = [
      {
        achieved: reservations.length > 0,
      },
      {
        achieved: uniqueContinents.length >= 4,
      },
      {
        achieved: uniqueCategories.length >= 4,
      },
      {
        achieved: reservations.length >= 10,
      },
    ];

    const badgesIcons = document.getElementById('badgesIcons');
    badgesIcons.innerHTML = badges.map(badge => {
      if (badge.achieved) {
        return `
          <img src="/img/icon/ic-filled-globe.svg" alt="Filled Globe" />
        `;
      } else {
        return `
          <img src="/img/icon/ic-empty-globe.svg" alt="Empty Globe" />
        `;
      }
    }).join('');
  }
}

// Initialize the view when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProfileSettingsView();
});

export default ProfileSettingsView;