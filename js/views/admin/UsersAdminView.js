class UsersAdminView {
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
                            <button type="button" class="border border-[var(--primary-color)] py-2 px-8 cursor-pointer font-medium w-36">
                                Flights
                            </button>
                        </a>
                    </li>
                    <li>
                        <a href="users.html">
                            <button type="button" class="border border-[var(--secondary-color)] py-2 px-8 cursor-pointer bg-[var(--secondary-color)] text-white font-medium w-36">
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
                                    Name
                                </div>
                            </th>
                            <th scope="col">
                                <div class="text-left bg-black px-4 py-5 border border-black text-nowrap">
                                    Email
                                </div>
                            </th>
                            <th scope="col">
                                <div class="text-left bg-black px-4 py-5 border border-black text-nowrap">
                                    Favourites Count
                                </div>
                            </th>
                            <th scope="col">
                                <div class="bg-black text-left px-4 py-5 border border-black text-nowrap">
                                    Status
                                </div>
                            </th>
                            <th scope="col">
                                <div class="bg-black text-left px-4 py-5 border border-black text-nowrap">
                                    Last Access
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
                        ${this.getUserRows()}
                    </tbody>
                </table>
            </div>
        `;
    }

    getUserRows() {
        // This would typically fetch data from an API
        const users = [
            {
                name: 'João Santos',
                email: 'example@email.com',
                favoritesCount: 4,
                status: 'Active',
                lastAccess: '04/05/2025 13:30'
            },
            {
                name: 'João Santos',
                email: 'example@email.com',
                favoritesCount: 4,
                status: 'Active',
                lastAccess: '04/05/2025 13:30'
            },
            {
                name: 'João Santos',
                email: 'example@email.com',
                favoritesCount: 4,
                status: 'Deactived',
                lastAccess: '04/05/2025 13:30'
            },
            {
                name: 'João Santos',
                email: 'example@email.com',
                favoritesCount: 4,
                status: 'Deactived',
                lastAccess: '04/05/2025 13:30'
            }
        ];

        return users.map((user, index) => `
            <tr>
                <td>
                    <div class="border-s p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)] ${index === users.length - 1 ? 'rounded-bl-md' : ''}">
                        ${user.name}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${user.email}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)] truncate">
                        ${user.favoritesCount}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${user.status}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${user.lastAccess}
                    </div>
                </td>
                <td>
                    <div class="p-[15.25px] ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-e border-b border-b-[var(--primary-color)] ${index === users.length - 1 ? 'rounded-br-md' : ''}">
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
        // Implement add user functionality
        console.log('Adding new user');
    }

    handleEdit(row) {
        const userData = {
            name: row.querySelector('td:nth-child(1)').textContent.trim(),
            email: row.querySelector('td:nth-child(2)').textContent.trim(),
            favoritesCount: row.querySelector('td:nth-child(3)').textContent.trim(),
            status: row.querySelector('td:nth-child(4)').textContent.trim(),
            lastAccess: row.querySelector('td:nth-child(5)').textContent.trim()
        };
        console.log('Editing user:', userData);
    }

    handleDelete(row) {
        const userName = row.querySelector('td:nth-child(1)').textContent.trim();
        if (confirm(`Are you sure you want to delete the user "${userName}"?`)) {
            console.log('Deleting user:', userName);
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

    // Helper method to toggle user status
    toggleUserStatus(row) {
        const statusCell = row.querySelector('td:nth-child(4)');
        const currentStatus = statusCell.textContent.trim();
        const newStatus = currentStatus === 'Active' ? 'Deactivated' : 'Active';

        // Update the status in the UI
        statusCell.textContent = newStatus;

        // Here you would also update the status in the backend
        console.log(`Toggling user status from ${currentStatus} to ${newStatus}`);
    }

    // Method to format date and time
    formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        return date.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Initialize the view when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UsersAdminView();
});