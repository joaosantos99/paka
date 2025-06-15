import LocalStorageCRUD from '/js/utilities/crud.js';
import UserModel from '/js/models/UserModel.js';

class ProfileReservationView {
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
                            <button
                              type="button"
                              data-tab="settings"
                              class="border border-[var(--primary-color)] py-2 px-8 cursor-pointer font-medium rounded-s-md w-36"
                            >
                              Settings
                            </button>
                        </a>
                    </li>

                    <li>
                        <a href="/html/profile/reservation.html">
                          <button
                            type="button"
                            data-tab="reservations"
                            class="border border-[var(--secondary-color)] py-2 px-8 cursor-pointer bg-[var(--secondary-color)] text-white font-medium w-36"
                          >
                            Reservations
                          </button>
                        </a>
                    </li>

                    <li>
                    <a href="/html/profile/badges.html">
                        <button
                        type="button" data-tab="badges"
                            class="border border-[var(--primary-color)] py-2 px-8 cursor-pointer font-medium rounded-e-md w-36">
                                Badges
                        </button>
                    </a>
                    </li>
                </ul>

                <div class="grid lg:grid-cols-3 sm:grid-cols-2 gap-6" id="reservationsGrid">
                    <!-- Reservations will be dynamically inserted here -->
                </div>
            </div>
            <!-- Profile Settings Section End -->
        `;

    this.renderReservations();
  }

  renderReservations() {
    const reservations = [
      {
        image: '/img/profile-card-img.png',
        icons: ['cactus', 'tree'],
        title: 'Pack Name',
        date: '11 to 15 April',
        price: '1760€',
        flights: {
          departure: {
            route: 'Porto - Rome',
            price: '160€',
            booked: true
          },
          return: {
            route: 'Rome - Porto',
            price: '160€',
            booked: true
          }
        }
      },
      {
        image: '/img/profile-card-img.png',
        icons: ['cactus', 'tree'],
        title: 'Pack Name',
        date: '11 to 15 April',
        price: '1760€',
        flights: {
          departure: {
            route: 'Porto - Rome',
            price: '160€',
            booked: true
          },
          return: {
            route: 'Returning',
            booked: false
          }
        }
      },
      {
        image: '/img/profile-card-img.png',
        icons: ['cactus', 'tree'],
        title: 'Pack Name',
        date: '11 to 15 April',
        price: '1760€',
        flights: {
          departure: {
            route: 'Departure',
            booked: false
          },
          return: {
            route: 'Returning',
            booked: false
          }
        }
      }
    ];

    const reservationsContainer = document.getElementById('reservationsGrid');
    reservationsContainer.innerHTML = reservations.map(reservation => `
            <div class="!bg-no-repeat !bg-cover !bg-center p-3 rounded-md text-[var(--screen-bg)]"
                style="background: url(${reservation.image})">
                <div class="flex items-center justify-center gap-3">
                    ${reservation.icons.map(icon => `
                        <img src="/img/icon/ic-${icon}.svg" alt="${icon} Icon" />
                    `).join('')}
                </div>

                <div class="text-center my-16">
                    <h4 class="text-3xl font-semibold text-center">${reservation.title}</h4>
                    <p>${reservation.date} / ${reservation.price}</p>
                </div>

                <div class="grid md:grid-cols-2 gap-3">
                    <button type="button"
                        class="${reservation.flights.departure.booked ? 'bg-[var(--secondary-color)]' : 'border border-[var(--screen-bg)]'} text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer text-nowrap">
                        ${reservation.flights.departure.booked ? `${reservation.flights.departure.route} | ${reservation.flights.departure.price}` : reservation.flights.departure.route}
                    </button>

                    <button type="button"
                        class="${reservation.flights.return.booked ? 'bg-[var(--secondary-color)]' : 'border border-[var(--screen-bg)]'} text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer text-nowrap">
                        ${reservation.flights.return.booked ? `${reservation.flights.return.route} | ${reservation.flights.return.price}` : reservation.flights.return.route}
                    </button>

                    <button type="button"
                        class="border border-[var(--screen-bg)] text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer md:col-span-2">
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

  handleReservationAction(action, reservationId) {
    console.log(`Reservation action: ${action}`, reservationId);
    // Implement reservation action functionality here (book flight, remove reservation, etc.)
  }

  setupEventListeners() {
    const tabButtons = document.querySelectorAll('[data-tab]');
    tabButtons.forEach(button => {
      button.addEventListener('click', () => this.handleTabChange(button));
    });

    // Add event listeners for reservation actions if needed
  }
}

// Initialize the view when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProfileReservationView();
});

export default ProfileReservationView;