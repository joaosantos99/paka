class FlightsAdminView {
    constructor() {
        this.renderView();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Add Entry button
        const addEntryButtons = document.querySelectorAll('button:contains("Add Entry")');
        addEntryButtons.forEach(button => {
            button.addEventListener('click', () => this.handleAddEntry());
        });

        // Edit buttons
        const editButtons = document.querySelectorAll('img[alt="Edit Icon"]');
        editButtons.forEach(button => {
            button.closest('button').addEventListener('click', (e) => {
                const row = e.target.closest('tr');
                this.handleEdit(row);
            });
        });

        // Delete buttons
        const deleteButtons = document.querySelectorAll('img[alt="Delete Icon"]');
        deleteButtons.forEach(button => {
            button.closest('button').addEventListener('click', (e) => {
                const row = e.target.closest('tr');
                this.handleDelete(row);
            });
        });

        // Navigation buttons
        const navButtons = document.querySelectorAll('ul button');
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const page = e.target.textContent.trim().toLowerCase();
                this.handleNavigation(page);
            });
        });
    }

    renderView() {
        const mainContent = document.querySelector('section');
        if (!mainContent) return;

        mainContent.innerHTML = this.getTemplate();
    }

    getTemplate() {
        return `
            <div class="mt-8 flex items-center gap-5 justify-between">
                <h4 class="text-3xl font-semibold">Dashboard</h4>
                <button type="button" class="border border-[var(--primary-color)] py-2 px-8 rounded-md cursor-pointer lg:hidden block">
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

                <button type="button" class="border border-[var(--primary-color)] py-2 px-8 rounded-md cursor-pointer lg:block hidden">
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
        // This would typically fetch data from an API
        const flights = [
            {
                departure: { location: 'Porto', date: '04/05/2025', time: '23:30' },
                arrival: { location: 'Rome', date: '04/05/2025', time: '03:00' },
                price: '210€'
            },
            {
                departure: { location: 'Porto', date: '04/05/2025', time: '23:30' },
                arrival: { location: 'Rome', date: '04/05/2025', time: '03:00' },
                price: '210€'
            },
            {
                departure: { location: 'Porto', date: '04/05/2025', time: '23:30' },
                arrival: { location: 'Rome', date: '04/05/2025', time: '03:00' },
                price: '210€'
            },
            {
                departure: { location: 'Porto', date: '04/05/2025', time: '23:30' },
                arrival: { location: 'Rome', date: '04/05/2025', time: '03:00' },
                price: '210€'
            }
        ];

        return flights.map((flight, index) => `
            <tr>
                <td>
                    <div class="border-s p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)] ${index === flights.length - 1 ? 'rounded-bl-md' : ''}">
                        ${flight.departure.location}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${flight.departure.date}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)] truncate">
                        ${flight.departure.time}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${flight.arrival.location}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${flight.arrival.date}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${flight.arrival.time}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${flight.price}
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
        // Implement add flight functionality
        console.log('Adding new flight');
    }

    handleEdit(row) {
        const flightData = {
            departureLocation: row.querySelector('td:nth-child(1)').textContent.trim(),
            departureDate: row.querySelector('td:nth-child(2)').textContent.trim(),
            departureTime: row.querySelector('td:nth-child(3)').textContent.trim(),
            arrivalLocation: row.querySelector('td:nth-child(4)').textContent.trim(),
            arrivalDate: row.querySelector('td:nth-child(5)').textContent.trim(),
            arrivalTime: row.querySelector('td:nth-child(6)').textContent.trim(),
            price: row.querySelector('td:nth-child(7)').textContent.trim()
        };
        console.log('Editing flight:', flightData);
    }

    handleDelete(row) {
        const flightInfo = `${row.querySelector('td:nth-child(1)').textContent.trim()} to ${row.querySelector('td:nth-child(4)').textContent.trim()}`;
        if (confirm(`Are you sure you want to delete the flight "${flightInfo}"?`)) {
            console.log('Deleting flight:', flightInfo);
            // Implement delete functionality
        }
    }

    handleNavigation(page) {
        const routes = {
            'packs': 'packs.html',
            'categories': 'categories.html',
            'flights': 'flights.html',
            'users': 'users.html',
            'search': 'search.html'
        };

        if (routes[page]) {
            window.location.href = routes[page];
        }
    }
}

// Initialize the view when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FlightsAdminView();
});