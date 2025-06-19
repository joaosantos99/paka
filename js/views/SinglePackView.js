import PackModel from '/js/models/PackModel.js';
import FlightsModel from '/js/models/FlightsModel.js';
import ReservationModel from '/js/models/ReservationModel.js';
import LocalStorageCRUD from '/js/utilities/crud.js';
import CategoryModel from '/js/models/CategoryModel.js';
import BaseView from '/js/views/BaseView.js';

class SinglePackView extends BaseView {
  constructor() {
    super();

    // Models
    this.flightsModel = FlightsModel;
    this.reservationModel = ReservationModel;
    this.packId = null;
    this.pack = null;

    // Data
    this.userId = LocalStorageCRUD.read('user');
    this.isAlreadyReserved = false;

    const search = window.location.search;
    if (search) {
      const searchParams = new URLSearchParams(search);
      this.packId = searchParams.get('id');
    }

    if (!this.packId) {
      window.location.href = '/html/404.html';
    }

    const reservations = this.reservationModel.getByPackId(this.packId);
    this.isAlreadyReserved = reservations.filter(reservation => reservation.userId === this.userId).length > 0;

    this.pack = PackModel.getByPk(parseInt(this.packId));

    // Render
    Promise.all([
      this.render()
    ]).then(() => {
      this.setupEventListeners();
    });
  }

  async render() {
    document.getElementById('packName').textContent = this.pack.name;
    document.getElementById('packHero').style.backgroundImage = `url(${await this.getImagePath(this.pack.featuredImage)})`;
    document.getElementById('packPriceAndDate').textContent = `${this.formatDateRange(this.pack.startDate, this.pack.endDate)} | ${this.pack.price}€`;
    document.getElementById('addReservationButton').disabled = this.isAlreadyReserved;
    document.getElementById('packTitle').textContent = this.pack.title;
    document.getElementById('packDescription').textContent = this.pack.description;

    await this.renderImageCarousel();
    await this.renderSimilarPacks();
  }

  async renderImageCarousel() {
    const images = await Promise.all(this.pack.images.map(async image => await this.getImagePath(image)));

    const carouselContainer = document.getElementById('imageCarousel');
    carouselContainer.innerHTML = images.map(image => `
            <img src="${image}" alt="Pack Image" class="md:w-2/5 sm:w-3/5 w-4/5" />
        `).join('');
  }

  async renderSimilarPacks() {
    const similarPacks = PackModel.getByCategory(this.pack.categories[0]);
    const similarPacksData = await Promise.all(similarPacks.map(async pack => {
      if (typeof pack.featuredImage === 'string' && pack.featuredImage.length > 0) {
        pack.featuredImage = await this.getImagePath(pack.featuredImage);
      }
      if (pack.categories.length > 0) {
        const categories = pack.categories.map(category => CategoryModel.getByField('name', category));
        pack.icons = categories.map(category => category.icon);
        pack.icons = await Promise.all(pack.icons.map(async icon => this.getImagePath(icon)));
      }

      return {
        image: pack.featuredImage,
        icons: pack.icons,
        title: pack.title,
        date: this.formatDateRange(pack.startDate, pack.endDate),
        price: pack.price
      }
    }));

    console.log(similarPacksData);

    const packsContainer = document.getElementById('similarPacks');
    packsContainer.innerHTML = similarPacksData.map(pack => `
            <div class="!bg-no-repeat !bg-cover !bg-center p-3 rounded-md text-[var(--screen-bg)] flex flex-col justify-between md:min-w-md"
                style="background: url(${pack.image})">
                <div class="flex items-center justify-center gap-3">
                    ${pack.icons.map(icon => `
                        <img src="${icon}" alt="${icon} Icon" width="34" />
                    `).join('')}
                </div>
                <div class="text-center my-28">
                    <h4 class="text-3xl font-semibold text-center">${pack.title}</h4>
                    <p>${pack.date} / ${pack.price}</p>
                </div>
                <button type="button"
                    class="border border-[var(--screen-bg)] text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer">
                    Know More
                </button>
            </div>
        `).join('');
  }

  handleReservation(e) {
    e.preventDefault();
    const departureFlightId = document.getElementById('departure').dataset.flightId;
    const arrivalFlightId = document.getElementById('arrival').dataset.flightId;
    const numberOfPeople = document.getElementById('numberOfPeople').value;

    this.reservationModel.create({
      userId: LocalStorageCRUD.read('user'),
      packId: this.packId,
      departureFlightId: departureFlightId || null,
      arrivalFlightId: arrivalFlightId || null,
      numberOfPeople: numberOfPeople || 1,
    });
  }

  toggleItineraryContent(button) {
    const dayIndex = button.dataset.day;
    const content = document.querySelector(`[data-content="${dayIndex}"]`);
    content.classList.toggle('hidden');
  }

  setupEventListeners() {
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
      reservationForm.addEventListener('submit', (e) => this.handleReservation(e));
    }

    const itineraryButtons = document.querySelectorAll('.itinerary-btn');
    itineraryButtons.forEach(button => {
      button.addEventListener('click', () => this.toggleItineraryContent(button));
    });

    // Add autocomplete for arrival input
    const arrivalInput = document.getElementById('arrival');
    if (arrivalInput) {
      arrivalInput.addEventListener('input', (e) => this.handleArrivalInput(e));
    }

    // Add autocomplete for departure input
    const departureInput = document.getElementById('departure');
    if (departureInput) {
      departureInput.addEventListener('input', (e) => this.handleDepartureInput(e));
    }
  }

  handleArrivalInput(e) {
    const input = e.target.value.toLowerCase();
    const flights = this.flightsModel.getAll();

    // Get the last stop of the current pack
    const lastStop = this.pack.stops[this.pack.stops.length - 1];
    if (!lastStop) return;

    // Get all flights that depart from the last stop
    const flightsFromLastStop = flights.filter(flight => flight.departure === lastStop);
    const uniqueArrivals = [...new Set(flightsFromLastStop.map(flight => flight.arrival))];

    // Show all arrivals if input is empty, otherwise filter
    const matches = input.length > 0
      ? uniqueArrivals.filter(arrival => arrival.toLowerCase().includes(input))
      : uniqueArrivals;

    if (matches.length > 0) {
      const list = document.createElement('ul');
      list.id = 'arrival-autocomplete';
      list.className = 'absolute top-10 z-10 w-80 bg-[var(--light-bg-color)] border border-[var(--primary-color)] rounded-md mt-1 max-h-60 overflow-auto shadow-lg';

      // Ensure the input container has proper positioning
      const inputContainer = e.target.parentNode;
      if (!inputContainer.style.position) {
        inputContainer.style.position = 'relative';
      }

      matches.forEach(match => {
        const item = document.createElement('li');
        item.className = 'px-4 py-3 text-sm hover:bg-[var(--secondary-color)] hover:text-[var(--screen-bg)] cursor-pointer transition-colors duration-200';
        const text = `${match} | ${flightsFromLastStop.find(flight => flight.arrival === match).price}€`;
        item.textContent = text;
        item.addEventListener('click', () => {
          e.target.value = text;
          e.target.dataset.flightId = flightsFromLastStop.find(flight => flight.arrival === match).id;
          list.remove();
        });
        list.appendChild(item);
      });

      // Remove any existing autocomplete list
      const existingList = document.getElementById('arrival-autocomplete');
      if (existingList) {
        existingList.remove();
      }

      // Insert the list after the input
      inputContainer.appendChild(list);
    }
  }

  handleDepartureInput(e) {
    const input = e.target.value.toLowerCase();
    const flights = this.flightsModel.getAll();

    // Get the first stop of the current pack
    const firstStop = this.pack.stops[0];
    if (!firstStop) return;

    // Get all flights that arrive at the first stop
    const flightsToFirstStop = flights.filter(flight => flight.arrival === firstStop);
    const uniqueDepartures = [...new Set(flightsToFirstStop.map(flight => flight.departure))];

    // Show all departures if input is empty, otherwise filter
    const matches = input.length > 0
      ? uniqueDepartures.filter(departure => departure.toLowerCase().includes(input))
      : uniqueDepartures;

    if (matches.length > 0) {
      const list = document.createElement('ul');
      list.id = 'departure-autocomplete';
      list.className = 'absolute top-10 z-10 w-80 bg-[var(--light-bg-color)] border border-[var(--primary-color)] rounded-md mt-1 max-h-60 overflow-auto shadow-lg';

      // Ensure the input container has proper positioning
      const inputContainer = e.target.parentNode;
      if (!inputContainer.style.position) {
        inputContainer.style.position = 'relative';
      }

      matches.forEach(match => {
        const item = document.createElement('li');
        item.className = 'px-4 py-3 text-sm hover:bg-[var(--secondary-color)] hover:text-[var(--screen-bg)] cursor-pointer transition-colors duration-200';
        const text = `${match} | ${flightsToFirstStop.find(flight => flight.departure === match).price}€`;
        item.dataset.flightId = flightsToFirstStop.find(flight => flight.departure === match).id;
        item.textContent = text;
        item.addEventListener('click', () => {
          e.target.value = text;
          e.target.dataset.flightId = flightsToFirstStop.find(flight => flight.departure === match).id;
          list.remove();
        });
        list.appendChild(item);
      });

      // Remove any existing autocomplete list
      const existingList = document.getElementById('departure-autocomplete');
      if (existingList) {
        existingList.remove();
      }

      // Add click event listener to document to handle clicks outside
      const handleClickOutside = (event) => {
        const list = document.getElementById('departure-autocomplete');
        const departureInput = document.getElementById('departure');

        if (list && !list.contains(event.target) && event.target !== departureInput) {
          list.remove();
          document.removeEventListener('click', handleClickOutside);
        }
      };

      document.addEventListener('click', handleClickOutside);

      // Insert the list after the input
      inputContainer.appendChild(list);
    }
  }


  formatDateRange(startDate, endDate) {
    const options = { day: 'numeric' };
    const startDay = new Intl.DateTimeFormat('en-GB', options).format(new Date(startDate));
    const endDay = new Intl.DateTimeFormat('en-GB', options).format(new Date(endDate));
    const endMonth = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(new Date(endDate));

    return `${startDay} to ${endDay} ${endMonth}`;
  }
}

// Initialize the view when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SinglePackView();
});

export default SinglePackView;