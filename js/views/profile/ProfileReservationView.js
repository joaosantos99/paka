import LocalStorageCRUD from '/js/utilities/crud.js';
import UserModel from '/js/models/UserModel.js';
import ReservationModel from '/js/models/ReservationModel.js';
import PackModel from '/js/models/PackModel.js';
import FlightsModel from '/js/models/FlightsModel.js';
import CategoryModel from '/js/models/CategoryModel.js';
import BaseView from '/js/views/BaseView.js';

class ProfileReservationView extends BaseView {
  constructor() {
    super();

    // Models
    const userId = LocalStorageCRUD.read('user');
    this.user = UserModel.getByPk(userId);

    // Render
    Promise.all([
      this.render()
    ]).then(() => {
      this.setupEventListeners();
    });
  }

  async render() {
    document.getElementById('profileName').textContent = this.user.name;
    document.getElementById('profileEmail').textContent = this.user.email;

    await this.renderReservations();
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

  async renderReservations() {
    const reservations = ReservationModel.getByUserId(this.user.id);
    const cards = await Promise.all(reservations.map(async reservation => {
      reservation.pack = PackModel.getByPk(reservation.packId);
      if (reservation.departureFlightId) {
        reservation.departureFlight = FlightsModel.getByPk(reservation.departureFlightId);
      }
      if (reservation.arrivalFlightId) {
        reservation.arrivalFlight = FlightsModel.getByPk(reservation.arrivalFlightId);
      }

      return {
        id: reservation.id,
        image: await this.getImagePath(reservation.pack.featuredImage),
        icons: await Promise.all(reservation.pack.categories.map(async category => {
          const categoryModel = CategoryModel.getByField('name', category);
          return await this.getImagePath(categoryModel.icon);
        })),
        title: reservation.pack.title,
        date: reservation.pack.startDate,
        price: reservation.pack.price,
        departureFlight: {
          arrival: reservation?.departureFlight?.arrival,
          price: reservation?.departureFlight?.price,
          booked: !!reservation?.departureFlight,
        },
        arrivalFlight: {
          departure: reservation?.arrivalFlight?.departure,
          price: reservation?.arrivalFlight?.price,
          booked: !!reservation?.arrivalFlight,
        },
      };
    }));

    const reservationsContainer = document.getElementById('reservationsGrid');
    reservationsContainer.innerHTML = cards.map(card => `
            <div class="!bg-no-repeat !bg-cover !bg-center p-3 rounded-md text-[var(--screen-bg)]"
                style="background: url(${card.image}); background-color: #8d8d8d; background-blend-mode: multiply;">
                <div class="flex items-center justify-center gap-3">
                    ${card.icons.map(icon => `
                        <img src="${icon}" alt="${icon} Icon" />
                    `).join('')}
                </div>

                <div class="text-center my-16">
                    <h4 class="text-3xl font-semibold text-center">${card.title}</h4>
                    <p>${card.date} / ${card.price}</p>
                </div>

                <div class="grid md:grid-cols-2 gap-3">
                    <div
                        class="flex items-center justify-center ${card.departureFlight.booked ? 'bg-[var(--secondary-color)]' : 'border border-[var(--screen-bg)]'} text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full text-nowrap">
                        <div class="flex items-center justify-center gap-2">
                            ${card.departureFlight.booked ? `
                                <p>${card.departureFlight.arrival}</p>
                                <p>${card.departureFlight.price}€</p>
                            ` : `
                                <p>No flight booked</p>
                            `}
                        </div>
                    </div>

                    <div
                        class="flex items-center justify-center ${card.arrivalFlight.booked ? 'bg-[var(--secondary-color)]' : 'border border-[var(--screen-bg)]'} text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full text-nowrap">
                        <div class="flex items-center justify-center gap-2">
                            ${card.arrivalFlight.booked ? `
                                <p>${card.arrivalFlight.departure}</p>
                                <p>${card.arrivalFlight.price}€</p>
                            ` : `
                                <p>No flight booked</p>
                            `}
                        </div>
                    </div>

                    <button type="button"
                        data-id="${card.id}"
                        class="border border-[var(--screen-bg)] text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer md:col-span-2 hover:bg-[var(--secondary-color)] hover:border-[var(--secondary-color)] transition-all duration-300">
                        Remove
                    </button>
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

  handleRemoveReservation(reservationId) {
    ReservationModel.delete(reservationId);
    this.renderReservations();
  }

  setupEventListeners() {
    const tabButtons = document.querySelectorAll('[data-tab]');
    tabButtons.forEach(button => {
      button.addEventListener('click', () => this.handleTabChange(button));
    });

    const removeButtons = document.querySelectorAll('[data-id]');
    removeButtons.forEach(button => {
      button.addEventListener('click', () => this.handleRemoveReservation(button.dataset.id));
    });
  }
}

// Initialize the view when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProfileReservationView();
});

export default ProfileReservationView;