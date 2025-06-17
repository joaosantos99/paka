import CategoryModel from '/js/models/CategoryModel.js';
import HeaderModel from '/js/views/HeaderView.js';
import FileStorage from '/js/utilities/fileStorage.js';
import SearchHandler from '/js/utilities/searchHandler.js';
import FlightsModel from '/js/models/FlightsModel.js';

class WaterPacksView {
  constructor() {
    this.categoryKey = null;
    this.category = null;
    this.queryParams = null;
    this.flightsModel = FlightsModel;

    const search = window.location.search;
    if (search) {
      const searchParams = new URLSearchParams(search);
      this.categoryKey = searchParams.get('category');
      this.queryParams = Object.fromEntries(searchParams);
    }

    if (this.categoryKey) {
      this.category = CategoryModel.getByField('name', this.categoryKey);
    }

    Promise.all([
      this.render(),
    ]).then(() => {
      this.setupEventListeners();
    });
  }

  async render() {
    const main = document.querySelector('main');
    main.innerHTML = `
            <!-- Header + Search Section Start -->
            <div class="sm:min-h-96 !bg-no-repeat !bg-cover !bg-center" style="background: url(${await this.getImagePath(this.category.featuredImage)})">
                <div id="lightHeaderContainer"></div>
                <div class="text-[var(--screen-bg)] text-center sm:my-16 mt-16">
                    <img src="${await this.getImagePath(this.category.icon)}" alt="Category icon" width="82" class="mx-auto mb-4" />
                    <h1 class="font-semibold text-4xl">${this.category.name}</h1>
                </div>

                <!-- Search Filter Section Start -->
                <section class="max-w-7xl px-4 mx-auto sm:translate-y-10 translate-y-40 relative z-999">
                    <div class="bg-[var(--light-bg-color)] p-4 rounded-md">
                        <form class="grid sm:grid-cols-12 md:gap-6 gap-2" id="searchForm">
                            <div class="sm:col-span-10">
                                <div class="grid sm:grid-cols-4 md:gap-6 gap-2">
                                    <input type="text" name="departure" id="departure"
                                        class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)]"
                                        placeholder="Departure"
                                        value="${this.queryParams.departure || ''}"
                                    />
                                    <div class="border rounded-md h-12 bg-[var(--screen-bg)] flex items-center justify-between">
                                        <div class="w-1/2">
                                            <input type="date" name="departingDate" id="departingDate"
                                                class="h-full p-3.5 focus-within:outline-0 text-sm w-full bg-transparent border-0"
                                                placeholder="Start Date"
                                                value="${this.queryParams.departingDate || ''}"
                                            />
                                        </div>
                                        <div class="h-8 w-[1px] bg-gray-500"></div>
                                        <div class="w-1/2">
                                            <input type="date" name="returningDate" id="returningDate"
                                                class="h-full p-3.5 focus-within:outline-0 text-sm w-full bg-transparent border-0"
                                                placeholder="End Date"
                                                value="${this.queryParams.returningDate || ''}"
                                            />
                                        </div>
                                    </div>
                                    <input type="number" name="numberOfPeople" id="numberOfPeople"
                                        class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)]"
                                        placeholder="1 Person"
                                        value="${this.queryParams.numberOfPeople || ''}"
                                    />
                                    <select name="category" id="category"
                                        class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)]">
                                        <option value="all">All Categories</option>
                                        ${CategoryModel.getAll().map(category => `
                                            <option
                                              ${this.categoryKey === category.name ? 'selected' : ''}
                                              value="${category.name}"
                                            >
                                              ${category.name}
                                            </option>
                                        `).join('')}
                                    </select>
                                </div>
                            </div>
                            <div class="sm:col-span-2">
                                <button type="submit"
                                    class="bg-[var(--secondary-color)] text-white rounded-md h-12 px-2.5 w-full cursor-pointer">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
                <!-- Search Filter Section End -->
            </div>
            <!-- Header + Search Section End -->

            <!-- Filter + Cards Section Start -->
            <section class="relative">
                <div class="max-w-7xl px-4 mx-auto sm:py-20 pt-52 pb-20">
                    <div class="grid md:grid-cols-12 gap-6 items-start">
                        <!-- Filter Section -->
                        <div class="lg:col-span-3 md:col-span-4 p-4 rounded-md bg-[var(--light-bg-color)] md:block hidden">
                            <h6 class="text-lg font-semibold">Filter by:</h6>
                            <div class="mt-3">
                                <label for="stops" class="font-medium cursor-pointer">Stops</label>
                                <input type="text" name="stops" id="stops"
                                    class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)] mt-1.5"
                                    placeholder="0"
                                    value="${this.queryParams.stops || ''}"
                                />
                            </div>
                            <div class="mt-3">
                                <label for="min" class="font-medium cursor-pointer">Budget</label>
                                <div class="flex items-center gap-2">
                                    <input type="text" name="min" id="min"
                                        class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)] mt-1.5"
                                        placeholder="0"
                                        value="${this.queryParams.min || ''}"
                                    />
                                    <span>-</span>
                                    <input type="text" name="max" id="max"
                                        class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)] mt-1.5"
                                        placeholder="10000+"
                                        value="${this.queryParams.max || ''}"
                                    />
                                </div>
                            </div>
                            <div class="mt-3">
                                <label for="continent" class="font-medium cursor-pointer">Continent</label>
                                <select name="continent" id="continent"
                                    class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)] mt-1.5">
                                    <option value="all">All</option>
                                    <option value="Europe" ${this.queryParams.continent === 'Europe' ? 'selected' : ''}>Europe</option>
                                    <option value="Asia" ${this.queryParams.continent === 'Asia' ? 'selected' : ''}>Asia</option>
                                    <option value="North America" ${this.queryParams.continent === 'North America' ? 'selected' : ''}>North America</option>
                                    <option value="South America" ${this.queryParams.continent === 'South America' ? 'selected' : ''}>South America</option>
                                    <option value="Africa" ${this.queryParams.continent === 'Africa' ? 'selected' : ''}>Africa</option>
                                    <option value="Oceania" ${this.queryParams.continent === 'Oceania' ? 'selected' : ''}>Oceania</option>
                                    <option value="Antarctica" ${this.queryParams.continent === 'Antarctica' ? 'selected' : ''}>Antarctica</option>
                                </select>
                            </div>
                            <div class="mt-3">
                                <label for="difficulty" class="font-medium cursor-pointer">Difficulty</label>
                                <select name="difficulty" id="difficulty"
                                    class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)] mt-1.5">
                                    <option value="all">All</option>
                                    <option value="easy" ${this.queryParams.difficulty === 'easy' ? 'selected' : ''}>Easy</option>
                                    <option value="medium" ${this.queryParams.difficulty === 'medium' ? 'selected' : ''}>Medium</option>
                                    <option value="hard" ${this.queryParams.difficulty === 'hard' ? 'selected' : ''}>Hard</option>
                                </select>
                            </div>
                        </div>

                        <!-- Cards Section -->
                        <div class="lg:col-span-9 md:col-span-8">
                            <div class="grid lg:grid-cols-3 sm:grid-cols-2 gap-6" id="packCards">
                                <!-- Pack cards will be dynamically inserted here -->
                            </div>
                        </div>
                    </div>
                    <img src="${await this.getImagePath(this.category.icon)}" alt="Category icon" class="absolute bottom-0 left-0 -z-10 contrast-80 w-100" />
                </div>
            </section>
            <!-- Filter + Cards Section End -->
        `;
    new HeaderModel();
    await this.renderPackCards();
  }

  async getImagePath(image) {
    const imageFile = await FileStorage.getFile(image);
    return imageFile ? URL.createObjectURL(imageFile) : null;
  }

  async renderPackCards() {
    const packs = SearchHandler.search();

    await Promise.all(packs.map(async pack => {
      if (typeof pack.featuredImage === 'string' && pack.featuredImage.length > 0) {
        pack.featuredImage = await this.getImagePath(pack.featuredImage);
      }
      if (pack.categories.length > 0) {
        const categories = pack.categories.map(category => CategoryModel.getByField('name', category));
        pack.icons = categories.map(category => category.icon);
        pack.icons = await Promise.all(pack.icons.map(async icon => this.getImagePath(icon)));
      }
    }));

    document.getElementById('packCards').innerHTML = packs.map(pack => `
      <div
        class="!bg-no-repeat !bg-cover !bg-center p-3 rounded-md text-[var(--screen-bg)] flex flex-col justify-between"
        style="background: url(${pack.featuredImage})"
        data-id="${pack.id}"
      >
        <div class="flex items-center justify-center gap-3">
          ${pack.icons.map(icon => `
              <img src="${icon}" alt="${icon} Icon" width="34" />
          `).join('')}
        </div>
        <div class="text-center my-16">
          <h4 class="text-3xl font-semibold text-center">${pack.title}</h4>
          <p>${this.formatDateRange(pack.startDate, pack.endDate)} / ${pack.price}€</p>
        </div>
        <a
          href="pack.html?id=${pack.id}"
          class="flex items-center justify-center border border-[var(--screen-bg)] text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer hover:bg-[var(--secondary-color)] hover:text-[var(--screen-bg)] hover:border-[var(--secondary-color)] transition-colors duration-200"
        >
          Know More
        </a>
      </div>
    `).join('');
  }

  handleSearch(e) {
    e.preventDefault();
    const formData = {
      departure: document.getElementById('departure').value,
      departingDate: document.getElementById('departingDate').value,
      returningDate: document.getElementById('returningDate').value,
      numberOfPeople: document.getElementById('numberOfPeople').value,
      category: document.getElementById('category').value,
      stops: document.getElementById('stops').value,
      difficulty: document.getElementById('difficulty').value,
      min: document.getElementById('min').value,
      max: document.getElementById('max').value,
      continent: document.getElementById('continent').value
    };

    const queryParams = new URLSearchParams();

    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        queryParams.set(key, formData[key]);
      }
    });

    window.location.search = queryParams.toString();
  }

  setupEventListeners() {
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => this.handleSearch(e));
    }

    // Add autocomplete for departure input
    const departureInput = document.getElementById('departure');
    if (departureInput) {
      departureInput.addEventListener('input', (e) => this.handleDepartureInput(e));
    }
  }

  handleDepartureInput(e) {
    const input = e.target.value.toLowerCase();
    const flights = this.flightsModel.getAll();
    const uniqueDepartures = [...new Set(flights.map(flight => flight.departure))];
    const matches = uniqueDepartures.filter(departure =>
      departure.toLowerCase().includes(input)
    );

    if (matches.length > 0 && input.length > 0) {
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
        item.textContent = match;
        item.addEventListener('click', () => {
          e.target.value = match;
          list.remove();
        });
        list.appendChild(item);
      });

      // Remove any existing autocomplete list
      const existingList = document.getElementById('departure-autocomplete');
      if (existingList) {
        existingList.remove();
      }

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
  new WaterPacksView();
});

export default WaterPacksView;