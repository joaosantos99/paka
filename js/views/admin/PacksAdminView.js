class PacksAdminView {
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

        // View buttons (Activities and Images)
        const viewButtons = document.querySelectorAll('td div:contains("View")');
        viewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const row = e.target.closest('tr');
                const type = e.target.closest('td').previousElementSibling.textContent.includes('Activities') ? 'activities' : 'images';
                this.handleViewDetails(row, type);
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
                            <button type="button" class="border border-[var(--secondary-color)] py-2 px-8 rounded-md rounded-e-none cursor-pointer bg-[var(--secondary-color)] text-white font-medium w-36">
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
                                <div class="text-left bg-black px-4 py-5 border border-black rounded-tl-md">
                                    Name
                                </div>
                            </th>
                            <th scope="col">
                                <div class="text-left bg-black px-4 py-5 border border-black">
                                    Price
                                </div>
                            </th>
                            <th scope="col">
                                <div class="text-left bg-black px-4 py-5 border border-black">
                                    Categories
                                </div>
                            </th>
                            <th scope="col">
                                <div class="text-left bg-black px-4 py-5 border border-black">
                                    Description
                                </div>
                            </th>
                            <th scope="col">
                                <div class="text-left bg-black px-4 py-5 border border-black">
                                    Date
                                </div>
                            </th>
                            <th scope="col">
                                <div class="bg-black text-left px-4 py-5 border border-black">
                                    Activities
                                </div>
                            </th>
                            <th scope="col">
                                <div class="bg-black text-left px-4 py-5 border border-black">
                                    Images
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
                        ${this.getPackRows()}
                    </tbody>
                </table>
            </div>
        `;
    }

    getPackRows() {
        // This would typically fetch data from an API
        const packs = [
            {
                name: 'Petra and the Desert of Wadi Rum',
                price: '1690€',
                categories: 'Desert',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, cupiditate.',
                date: '03/05/2025 - 06/05/2025',
                activities: 'View',
                images: 'View'
            },
            {
                name: 'Petra and the Desert of Wadi Rum',
                price: '1690€',
                categories: 'Desert',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, cupiditate.',
                date: '03/05/2025 - 06/05/2025',
                activities: 'View',
                images: 'View'
            },
            {
                name: 'Petra and the Desert of Wadi Rum',
                price: '1690€',
                categories: 'Desert',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, cupiditate.',
                date: '03/05/2025 - 06/05/2025',
                activities: 'View',
                images: 'View'
            },
            {
                name: 'Petra and the Desert of Wadi Rum',
                price: '1690€',
                categories: 'Desert',
                description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, cupiditate.',
                date: '03/05/2025 - 06/05/2025',
                activities: 'View',
                images: 'View'
            }
        ];

        return packs.map((pack, index) => `
            <tr>
                <td>
                    <div class="border-s p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)] ${index === packs.length - 1 ? 'rounded-bl-md' : ''}">
                        ${pack.name}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${pack.price}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${pack.categories}
                    </div>
                </td>
                <td class="${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''}">
                    <div class="border-b border-b-[var(--primary-color)]">
                        <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} truncate w-36">
                            ${pack.description}
                        </div>
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${pack.date}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${pack.activities}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${pack.images}
                    </div>
                </td>
                <td>
                    <div class="p-[15.25px] ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-e border-b border-b-[var(--primary-color)] ${index === packs.length - 1 ? 'rounded-br-md' : ''}">
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
        // Implement add pack functionality
        console.log('Adding new pack');
    }

    handleEdit(row) {
        const packData = {
            name: row.querySelector('td:nth-child(1)').textContent.trim(),
            price: row.querySelector('td:nth-child(2)').textContent.trim(),
            categories: row.querySelector('td:nth-child(3)').textContent.trim(),
            description: row.querySelector('td:nth-child(4)').textContent.trim(),
            date: row.querySelector('td:nth-child(5)').textContent.trim()
        };
        console.log('Editing pack:', packData);
    }

    handleDelete(row) {
        const packName = row.querySelector('td:nth-child(1)').textContent.trim();
        if (confirm(`Are you sure you want to delete the pack "${packName}"?`)) {
            console.log('Deleting pack:', packName);
            // Implement delete functionality
        }
    }

    handleViewDetails(row, type) {
        const packName = row.querySelector('td:nth-child(1)').textContent.trim();
        console.log(`Viewing ${type} for pack:`, packName);
        // Implement view functionality for activities or images
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
    new PacksAdminView();
});