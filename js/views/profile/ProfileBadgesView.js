import LocalStorageCRUD from '/js/utilities/crud.js';
import UserModel from '/js/models/UserModel.js';
import ReservationModel from '/js/models/ReservationModel.js';
import PackModel from '/js/models/PackModel.js';

class ProfileBadgesView {
  constructor() {
    const userId = LocalStorageCRUD.read('user');
    this.user = UserModel.getByPk(userId);

    this.render();
    this.setupEventListeners();
  }

  render() {
    document.getElementById('profileName').textContent = this.user.name;
    document.getElementById('profileEmail').textContent = this.user.email;

    this.renderBadges();
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
        title: 'First Timer',
        description: 'Reserve your first pack',
        reward: '5% discount'
      },
      {
        achieved: uniqueContinents.length >= 4,
        title: 'World Traveler',
        description: 'Reserve 4 packs to 4 different continents',
        reward: '5% discount'
      },
      {
        achieved: uniqueCategories.length >= 4,
        title: 'Jack of All Trades',
        description: 'Reserve 4 packs to 4 different categories',
        reward: '5% discount'
      },
      {
        achieved: reservations.length >= 10,
        title: 'Travel Enthusiast',
        description: 'Reserve 10 packs',
        reward: '5% discount'
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

    const badgesContainer = document.getElementById('badgesGrid');
    badgesContainer.innerHTML = badges.map(badge => `
            <div class="pb-4 pt-8 px-5 rounded-xl bg-[var(--light-bg-color)] flex flex-col justify-center items-center text-center ${badge.achieved ? '' : 'opacity-50'}">
                <img src="/img/icon/ic-filled-globe.svg" alt="Filled Globe" />
                <h5 class="font-semibold text-2xl mt-3">${badge.title}</h5>
                <p class="w-10/12 leading-4">${badge.description}</p>
                <div class="text-base mt-10">
                    Reward:
                    <span class="text-[var(--secondary-color)] font-semibold">${badge.reward}</span>
                </div>
            </div>
        `).join('');
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
    const tabButtons = document.querySelectorAll('[data-tab]');
    tabButtons.forEach(button => {
      button.addEventListener('click', () => this.handleTabChange(button));
    });
  }
}

// Initialize the view when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProfileBadgesView();
});

export default ProfileBadgesView;