import CategoryModel from '/js/models/CategoryModel.js';
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
    document.getElementById('categoryName').textContent = this.category.name;
    document.getElementById('categoryHero').style.backgroundImage = `url(${await this.getImagePath(this.category.featuredImage)})`;
    document.getElementById('categoryIcon').src = await this.getImagePath(this.category.icon);
    document.getElementById('categoryIconBottom').src = await this.getImagePath(this.category.icon);

    this.renderForm();
    await this.renderPackCards();
  }

  renderForm() {
    document.getElementById('category').innerHTML = [{ name: 'All' }, ...CategoryModel.getAll()].map(category => `
      <option value="${category.name}">${category.name}</option>
    `).join('');

    this.fillForm();
    this.fillFormFields();
  }

  fillForm() {
    document.getElementById('departure').value = this.queryParams.departure || '';
    document.getElementById('departingDate').value = this.queryParams.departingDate || '';
    document.getElementById('returningDate').value = this.queryParams.returningDate || '';
    document.getElementById('numberOfPeople').value = this.queryParams.numberOfPeople || '';
    document.getElementById('category').value = this.categoryKey || '';
  }

  fillFormFields() {
    document.getElementById('stops').value = this.queryParams.stops || '';
    document.getElementById('min').value = this.queryParams.min || '';
    document.getElementById('max').value = this.queryParams.max || '';
    document.getElementById('continent').value = this.queryParams.continent || 'all';
    document.getElementById('difficulty').value = this.queryParams.difficulty || 'all';
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