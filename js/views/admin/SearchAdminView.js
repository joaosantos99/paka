class SearchAdminView {
    constructor() {
        this.renderView();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Navigation buttons
        const navButtons = document.querySelectorAll('ul button');
        navButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const page = e.target.textContent.trim().toLowerCase();
                this.handleNavigation(page);
            });
        });

        // Add search functionality
        this.setupSearchFunctionality();
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
                            <button type="button" class="border border-[var(--primary-color)] py-2 px-8 cursor-pointer font-medium w-36">
                                Users
                            </button>
                        </a>
                    </li>
                    <li>
                        <a href="search.html">
                            <button type="button" class="border border-[var(--secondary-color)] py-2 px-8 cursor-pointer bg-[var(--secondary-color)] text-white font-medium rounded-e-md w-36">
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
                                    User Id
                                </div>
                            </th>
                            <th scope="col">
                                <div class="text-left bg-black px-4 py-5 border border-black text-nowrap">
                                    User Name
                                </div>
                            </th>
                            <th scope="col">
                                <div class="text-left bg-black px-4 py-5 border border-black text-nowrap">
                                    Categories
                                </div>
                            </th>
                            <th scope="col">
                                <div class="bg-black text-left px-4 py-5 border border-black text-nowrap">
                                    Departing
                                </div>
                            </th>
                            <th scope="col">
                                <div class="bg-black text-left px-4 py-5 border border-black text-nowrap">
                                    Returning
                                </div>
                            </th>
                            <th scope="col">
                                <div class="bg-black text-left px-4 py-5 border border-black text-nowrap rounded-tr-md">
                                    Last Search
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.getSearchRows()}
                    </tbody>
                </table>
            </div>
        `;
    }

    getSearchRows() {
        // This would typically fetch data from an API
        const searches = [
            {
                userId: '2',
                userName: 'João Santos',
                categories: 'Desert, Mountain',
                departing: '03/05/2025',
                returning: '23/05/2025',
                lastSearch: '23/05/2025 10:50'
            },
            {
                userId: '25',
                userName: 'João Santos',
                categories: 'Desert, Mountain',
                departing: '03/05/2025',
                returning: '23/05/2025',
                lastSearch: '23/05/2025 10:50'
            },
            {
                userId: '1',
                userName: 'João Santos',
                categories: 'Desert, Mountain',
                departing: '03/05/2025',
                returning: '23/05/2025',
                lastSearch: '23/05/2025 10:50'
            },
            {
                userId: '1',
                userName: 'João Santos',
                categories: 'Desert, Mountain',
                departing: '03/05/2025',
                returning: '23/05/2025',
                lastSearch: '23/05/2025 10:50'
            }
        ];

        return searches.map((search, index) => `
            <tr>
                <td>
                    <div class="border-s p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)] ${index === searches.length - 1 ? 'rounded-bl-md' : ''}">
                        ${search.userId}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${search.userName}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)] truncate">
                        ${search.categories}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${search.departing}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${search.returning}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)] border-e ${index === searches.length - 1 ? 'rounded-br-md' : ''}">
                        ${search.lastSearch}
                    </div>
                </td>
            </tr>
        `).join('');
    }

    setupSearchFunctionality() {
        // Here you would implement the search functionality
        // This could include:
        // - Search by user ID
        // - Search by username
        // - Filter by categories
        // - Filter by date ranges
        // - etc.
        console.log('Search functionality initialized');
    }

    handleSearch(searchParams) {
        const searchData = {
            userId: searchParams.userId,
            userName: searchParams.userName,
            categories: searchParams.categories,
            departing: searchParams.departing,
            returning: searchParams.returning
        };
        console.log('Performing search with params:', searchData);
        // Implement actual search functionality
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

    // Helper method to format search results
    formatSearchResults(results) {
        // Implement formatting of search results for display
        return results.map(result => ({
            userId: result.userId,
            userName: result.userName,
            categories: result.categories.join(', '),
            departing: new Date(result.departing).toLocaleDateString(),
            returning: new Date(result.returning).toLocaleDateString()
        }));
    }

    // Method to update the table with search results
    updateSearchResults(formattedResults) {
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = ''; // Clear existing results

        formattedResults.forEach((result, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="border-s p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)] ${index === formattedResults.length - 1 ? 'rounded-bl-md' : ''}">
                        ${result.userId}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${result.userName}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${result.categories}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${result.departing}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${result.returning}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)] border-e ${index === formattedResults.length - 1 ? 'rounded-br-md' : ''}">
                        ${new Date().toLocaleString()}
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
}

// Initialize the view when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SearchAdminView();
});