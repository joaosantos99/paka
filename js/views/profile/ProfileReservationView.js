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
    document.getElementById('profileName').textContent = this.user.name;
    document.getElementById('profileEmail').textContent = this.user.email;

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