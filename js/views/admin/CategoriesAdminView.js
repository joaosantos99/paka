class CategoriesAdminView {
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
                            <button type="button" class="border border-[var(--secondary-color)] py-2 px-8 cursor-pointer bg-[var(--secondary-color)] text-white font-medium w-36">
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
                                    Description
                                </div>
                            </th>
                            <th scope="col">
                                <div class="text-left bg-black px-4 py-5 border border-black text-nowrap">
                                    No of Packs
                                </div>
                            </th>
                            <th scope="col">
                                <div class="bg-black text-left px-4 py-5 border border-black text-nowrap">
                                    Featured Image
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
                        ${this.getCategoryRows()}
                    </tbody>
                </table>
            </div>
        `;
    }

    getCategoryRows() {
        // This would typically fetch data from an API
        const categories = [
            { name: 'Desert', description: 'Experience the vast beauty of desert landscapes and unique adventures', packs: 4, image: 'View' },
            { name: 'Mountain', description: 'Conquer peaks and discover breathtaking mountain vistas', packs: 5, image: 'View' },
            { name: 'Water', description: 'Dive into aquatic adventures and coastal experiences', packs: 3, image: 'View' },
            { name: 'Forest', description: 'Explore lush forests and connect with nature', packs: 4, image: 'View' }
        ];

        return categories.map((category, index) => `
            <tr>
                <td>
                    <div class="border-s p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)] ${index === categories.length - 1 ? 'rounded-bl-md' : ''}">
                        ${category.name}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)] truncate">
                        ${category.description}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${category.packs}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${category.image}
                    </div>
                </td>
                <td>
                    <div class="p-[15.25px] ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-e border-b border-b-[var(--primary-color)] ${index === categories.length - 1 ? 'rounded-br-md' : ''}">
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
        // Implement add category functionality
        console.log('Adding new category');
    }

    handleEdit(row) {
        const categoryData = {
            name: row.querySelector('td:nth-child(1)').textContent.trim(),
            description: row.querySelector('td:nth-child(2)').textContent.trim(),
            noOfPacks: row.querySelector('td:nth-child(3)').textContent.trim(),
            featuredImage: row.querySelector('td:nth-child(4)').textContent.trim()
        };
        console.log('Editing category:', categoryData);
    }

    handleDelete(row) {
        const categoryName = row.querySelector('td:nth-child(1)').textContent.trim();
        if (confirm(`Are you sure you want to delete the category "${categoryName}"?`)) {
            console.log('Deleting category:', categoryName);
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
    new CategoriesAdminView();
});