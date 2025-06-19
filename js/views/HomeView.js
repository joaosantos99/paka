import FileStorage from '/js/utilities/fileStorage.js';
import FlightsModel from '/js/models/FlightsModel.js';
import CategoryModel from '/js/models/CategoryModel.js';
import PackModel from '/js/models/PackModel.js';

export default class HomeView {
  constructor() {
    this.flightsModel = FlightsModel;
    this.categoryModel = CategoryModel;
    this.packModel = PackModel;

    this.categories = this.categoryModel.getAll();
    this.activeCategory = this.categories[0].name;

    Promise.all([
      this.render(),
    ]).then(() => {
      this.addEventListeners();
    });
  }

  async render() {
    const categorySelect = document.getElementById('category');
    if (categorySelect) {
      categorySelect.innerHTML = [{ name: 'All' }, ...this.categories].map(category => `
        <option value="${category.name}">${category.name}</option>
      `).join('');
    }

    const featuredCategoriesSection = document.getElementById('featuredCategoriesSection');
    if (featuredCategoriesSection) {
      featuredCategoriesSection.innerHTML = await this.getFeaturedCategoriesSection();
    }

    const featuredPacksSection = document.getElementById('featuredPacksSection');
    if (featuredPacksSection) {
      featuredPacksSection.innerHTML = await this.getFeaturedPacksSection();
    }
  }

  hydrateView() {
    Promise.all([
      this.render(),
    ]).then(() => {
      this.addEventListeners();
    });
  }

  async getFeaturedCategoriesSection() {
    const categories = this.categoryModel.getAll();

    const featuredCategories = await Promise.all(categories.map(async category => {
      category.featuredImage = await this.getImagePath(category.featuredImage);
      category.icon = await this.getImagePath(category.icon);
      return category;
    }));

    return `
      <div class="max-w-7xl px-4 mx-auto">
        <h4 class="md:text-4xl text-3xl font-semibold md:mb-8 pb-5">Featured Categories</h4>
        <div class="flex gap-6 w-full overflow-x-hidden">
          ${featuredCategories.map(category => `
          <div class="!bg-no-repeat !bg-cover !bg-center p-4 rounded-xl text-[var(--screen-bg)] w-[100%] hover:w-[200%] transition-all duration-300 min-h-[600px] flex items-end" style="background: url(${category.featuredImage})">
            <div>
              <img src="${category.icon}" alt="${category.name} Img" />
              <h5 class="mt-2 text-2xl font-semibold">${category.name}</h5>
              <p class="md:w-10/12">${category.description}</p>
              <a href="/html/category.html?category=${category.name}" class="flex items-center justify-center gap-2 bg-[var(--secondary-color)] text-white rounded-md h-12 px-10 mt-3 w-full cursor-pointer hover:bg-transparent hover:text-[var(--light-bg-color)] hover:border hover:border-[var(--light-bg-color)] transition-all duration-300">Explore</a>
            </div>
          </div>
          `).join('')}
        </div>
      </div>
    </section>
  `};

  async getFeaturedPacksSection() {
    // Get packs from the selected category
    const packs = this.packModel.getByCategory(this.activeCategory);
    const maxPacks = 6;
    const displayPacks = await Promise.all(packs.slice(0, maxPacks).map(async (pack, idx) => {
      pack.featuredImage = await this.getImagePath(pack.featuredImage);

      const icons = await Promise.all(pack.categories.map(async category => {
        const categoryData = this.categories.find(c => c.name === category);
        return categoryData ? await this.getImagePath(categoryData.icon) : null;
      }));

      return {
        id: pack.id,
        name: pack.name,
        featuredImage: pack.featuredImage,
        icons,
        price: pack.price,
        startDate: pack.startDate,
        endDate: pack.endDate,
        gridSpan: idx === 1 || idx === 5 ? 'lg:col-span-2' : '',
      };
    }));

    return `
      <div class="max-w-7xl px-4 mx-auto">
        <h4 class="md:text-4xl text-3xl font-semibold">Featured Packs</h4>

        <div class="mt-8 mb-5 flex justify-between gap-5 items-center">
          <ul class="flex gap-2 overflow-x-auto">
            ${this.categories.map((category, idx) => `
            <li>
              ${this.activeCategory === category.name ? `
                <button type="button" class="category-button border border-[var(--secondary-color)] py-2 px-8 ${idx === 0 ? 'rounded-md rounded-e-none' : ''} ${idx === this.categories.length - 1 ? 'rounded-md rounded-s-none' : ''} cursor-pointer bg-[var(--secondary-color)] text-white font-medium w-36">
                  ${category.name}
                </button>
              ` : `
                <button type="button" class="category-button border border-[var(--primary-color)] py-2 px-8 ${idx === 0 ? 'rounded-md rounded-e-none' : ''} ${idx === this.categories.length - 1 ? 'rounded-md rounded-s-none' : ''} cursor-pointer font-medium w-36">
                  ${category.name}
                </button>
              `}
            </li>
            `).join('')}
          </ul>
        </div>

        <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
          ${displayPacks.map((pack, index) => `
              <div class="!bg-no-repeat !bg-cover !bg-center p-3 rounded-md text-[var(--screen-bg)] ${pack.gridSpan} flex flex-col justify-between" style="background: url(${pack.featuredImage || '../img/packs/' + (index + 1) + '.png'})">
                <div class="flex items-center justify-center gap-3">
                  ${pack.icons.map(icon => `
                    <img src="${icon}" alt="Category Icon" width="34" />
                  `).join('')}
                </div>
                <div class="text-center my-28">
                  <h4 class="text-3xl font-semibold text-center">${pack.title || pack.name}</h4>
                  <p>${this.formatDateRange(pack.startDate, pack.endDate)} / ${pack.price}€</p>
                </div>
                <a
                  class="flex items-center justify-center border border-[var(--screen-bg)] text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer md:col-span-2 hover:bg-[var(--secondary-color)] hover:border-[var(--secondary-color)] hover:text-[var(--screen-bg)] transition-all duration-300"
                  href="/html/pack.html?id=${pack.id}"
                >
                  Know More
                </a>
              </div>
            `).join('')}
        </div>

        <a
          class="flex items-center justify-center border border-[var(--primary-bg)] text-[var(--primary-bg-color)] rounded-md h-12 px-12 w-fit mx-auto block cursor-pointer mt-6 hover:bg-[var(--secondary-color)] hover:text-[var(--screen-bg)] transition-all duration-300"
          href="/html/category.html?category=${this.activeCategory}"
        >
          Find More
        </a>
      </div>
    `;
  }

  async getImagePath(image) {
    const imageFile = await FileStorage.getFile(image);
    return imageFile ? URL.createObjectURL(imageFile) : null;
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

  addEventListeners() {
    const searchForm = document.querySelector('form');
    if (searchForm) {
      searchForm.addEventListener('submit', this.handleSearch);
    }

    // Add autocomplete for departure input
    const departureInput = document.getElementById('departure');
    if (departureInput) {
      departureInput.addEventListener('input', (e) => this.handleDepartureInput(e));
    }

    const categoryButtons = document.querySelectorAll('button.category-button');
    categoryButtons.forEach(button => {
      button.addEventListener('click', this.handleCategoryClick);
    });
  }

  handleSearch = (e) => {
    e.preventDefault();
    const formData = {
      departure: document.getElementById('departure').value,
      departingDate: document.getElementById('departingDate').value,
      returningDate: document.getElementById('returningDate').value,
      numberOfPeople: document.getElementById('numberOfPeople').value,
      category: document.getElementById('category').value,
    };

    const queryParams = new URLSearchParams();

    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        queryParams.set(key, formData[key]);
      }
    });

    window.location = `/html/category.html?${queryParams.toString()}`;
  }

  formatDateRange(startDate, endDate) {
    const options = { day: 'numeric' };
    const startDay = new Intl.DateTimeFormat('en-GB', options).format(new Date(startDate));
    const endDay = new Intl.DateTimeFormat('en-GB', options).format(new Date(endDate));
    const endMonth = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(new Date(endDate));

    return `${startDay} to ${endDay} ${endMonth}`;
  }

  handleCategoryClick = (e) => {
    this.activeCategory = e.target.textContent.trim();
    this.hydrateView();
  }
}

new HomeView();