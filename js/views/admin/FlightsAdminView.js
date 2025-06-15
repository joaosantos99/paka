import BaseAdminView from '/js/views/admin/BaseAdminView.js';
import FlightsModel from '/js/models/FlightsModel.js';
import ModalView from '/js/views/components/ModalView.js';

class FlightsAdminView extends BaseAdminView {
  constructor({ model }) {
    super();
    this.model = model;
    Promise.all([
      this.renderView(),
    ]).then(() => {
      this.initializeEventListeners();
    });
  }

  async getTemplate() {
    return `
            <div class="mt-8 flex items-center gap-5 justify-between">
                <h4 class="text-3xl font-semibold">Dashboard</h4>
                <button id="addEntryButton" type="button" class="border border-[var(--primary-color)] py-2 px-8 rounded-md cursor-pointer lg:hidden block">
                    Add Entry
                </button>
            </div>

            <div class="my-5 flex justify-between gap-5 items-center">
                <ul class="flex gap-2 overflow-x-auto">
                    <li>
                        <a href="packs.html">
                            <button type="button" class="border border-[var(--primary-color)] rounded-md rounded-e-none py-2 px-8 cursor-pointer font-medium w-36">
                                Packs
                            </button>
                        </a>
                    </li>
                    <li>
                        <a href="categories.html">
                            <button type="button" class="border border-[var(--primary-color)] py-2 px-8 cursor-pointer font-medium w-36">
                                Categories
                            </button>
                        </a>
                    </li>
                    <li>
                        <a href="flights.html">
                            <button type="button" class="border border-[var(--secondary-color)] py-2 px-8 cursor-pointer bg-[var(--secondary-color)] text-white font-medium w-36">
                                Flights
                            </button>
                        </a>
                    </li>
                    <li>
                        <a href="users.html">
                            <button type="button" class="border border-[var(--primary-color)] py-2 px-8 cursor-pointer font-medium w-36">
                                Users
                            </button>
                        </a>
                    </li>
                    <li>
                        <a href="search.html">
                            <button type="button" class="border border-[var(--primary-color)] py-2 px-8 cursor-pointer font-medium rounded-e-md w-36">
                                Search
                            </button>
                        </a>
                    </li>
                </ul>

                <button id="addEntryButton" type="button" class="border border-[var(--primary-color)] py-2 px-8 rounded-md cursor-pointer lg:block hidden">
                    Add Entry
                </button>
            </div>

            <div class="w-full overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="text-[var(--screen-bg)]">
                            <th scope="col">
                                <div class="text-left bg-black px-4 py-5 border border-black rounded-tl-md text-nowrap">
                                    Departure - Location
                                </div>
                            </th>
                            <th scope="col">
                                <div class="text-left bg-black px-4 py-5 border border-black text-nowrap">
                                    Departure - Date
                                </div>
                            </th>
                            <th scope="col">
                                <div class="text-left bg-black px-4 py-5 border border-black text-nowrap">
                                    Departure - Time
                                </div>
                            </th>
                            <th scope="col">
                                <div class="bg-black text-left px-4 py-5 border border-black text-nowrap">
                                    Arrival - Location
                                </div>
                            </th>
                            <th scope="col">
                                <div class="bg-black text-left px-4 py-5 border border-black text-nowrap">
                                    Arrival - Date
                                </div>
                            </th>
                            <th scope="col">
                                <div class="bg-black text-left px-4 py-5 border border-black text-nowrap">
                                    Arrival - Time
                                </div>
                            </th>
                            <th scope="col">
                                <div class="bg-black text-left px-4 py-5 border border-black text-nowrap">
                                    Price
                                </div>
                            </th>
                            <th scope="col">
                                <div class="bg-black text-left px-4 py-5 border border-black rounded-tr-md text-black">
                                    Action
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.getFlightRows()}
                    </tbody>
                </table>
            </div>
        `;
  }

  getFlightRows() {
    const flights = this.model.getAll();

    return flights.map((flight, index) => `
            <tr id="flight-${flight.id}">
                <td>
                    <div class="border-s p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)] ${index === flights.length - 1 ? 'rounded-bl-md' : ''}">
                        ${flight.departure}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${flight.departureDate}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)] truncate">
                        ${flight.departureTime}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${flight.arrival}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${flight.arrivalDate}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${flight.arrivalTime}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${flight.price}€
                    </div>
                </td>
                <td>
                    <div class="p-[15.25px] ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-e border-b border-b-[var(--primary-color)] ${index === flights.length - 1 ? 'rounded-br-md' : ''}">
                        <button type="button" class="cursor-pointer">
                            <img src="../../img/icon/ic-edit.svg" alt="Edit Icon" class="me-2" />
                        </button>
                        <button type="button" class="cursor-pointer">
                            <img src="../../img/icon/ic-delete.svg" alt="Delete Icon" />
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
  }

  handleAddEntry() {
    new ModalView({
      title: 'Add Flight',
      fields: {
        departure: {
          type: 'text',
          label: 'Departure Location',
        },
        departureDate: {
          type: 'date',
          label: 'Departure Date',
        },
        departureTime: {
          type: 'time',
          label: 'Departure Time',
        },
        arrival: {
          type: 'text',
          label: 'Arrival Location',
        },
        arrivalDate: {
          type: 'date',
          label: 'Arrival Date',
        },
        arrivalTime: {
          type: 'time',
          label: 'Arrival Time',
        },
        price: {
          type: 'number',
          label: 'Price (€)',
        },
      },
      onSubmit: (data) => {
        this.model.create(data);
        this.hydrateView();
      }
    }).show();
  }

  handleEdit(row) {
    const flightId = parseInt(row.id.split('-')[1]);
    const flight = this.model.getByPk(flightId);

    new ModalView({
      title: 'Edit Flight',
      fields: {
        'departure.location': {
          type: 'text',
          label: 'Departure Location',
          value: flight.departure
        },
        'departure.date': {
          type: 'date',
          label: 'Departure Date',
          value: flight.departureDate
        },
        'departure.time': {
          type: 'time',
          label: 'Departure Time',
          value: flight.departureTime
        },
        'arrival.location': {
          type: 'text',
          label: 'Arrival Location',
          value: flight.arrival
        },
        'arrival.date': {
          type: 'date',
          label: 'Arrival Date',
          value: flight.arrivalDate
        },
        'arrival.time': {
          type: 'time',
          label: 'Arrival Time',
          value: flight.arrivalTime
        },
        price: {
          type: 'number',
          label: 'Price (€)',
          value: flight.price
        },
      },
      onSubmit: (data) => {
        this.model.update(flightId, data);
        this.hydrateView();
      }
    }).show();
  }
}

// Initialize the view when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FlightsAdminView({ model: FlightsModel });
});