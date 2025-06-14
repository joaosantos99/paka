import CategoryModel from '/js/models/CategoryModel.js';
import HeaderModel from '/js/views/HeaderView.js';
import FileStorage from '/js/utilities/fileStorage.js';
import PackModel from '/js/models/PackModel.js';

class WaterPacksView {
  constructor() {
    this.categoryKey = null;
    this.category = null;

    const search = window.location.search;
    if (search) {
      const searchParams = new URLSearchParams(search);
      this.categoryKey = searchParams.get('category');
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
                <section class="max-w-7xl px-4 mx-auto sm:translate-y-10 translate-y-40">
                    <div class="bg-[var(--light-bg-color)] p-4 rounded-md">
                        <form class="grid sm:grid-cols-12 md:gap-6 gap-2" id="searchForm">
                            <div class="sm:col-span-10">
                                <div class="grid sm:grid-cols-4 md:gap-6 gap-2">
                                    <input type="text" name="departure" id="departure"
                                        class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)]"
                                        placeholder="Departure" />
                                    <input type="text" name="date" id="date"
                                        class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)]"
                                        placeholder="Date" />
                                    <input type="text" name="adult" id="adult"
                                        class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)]"
                                        placeholder="1 Adult" />
                                    <input type="text" name="type" id="type"
                                        class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)]"
                                        placeholder="Type" />
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
                                <label for="stop" class="font-medium cursor-pointer">Stop</label>
                                <input type="text" name="stop" id="stop"
                                    class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)] mt-1.5"
                                    placeholder="0" />
                            </div>
                            <div class="mt-3">
                                <label for="min" class="font-medium cursor-pointer">Budget</label>
                                <div class="flex items-center gap-2">
                                    <input type="text" name="min" id="min"
                                        class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)] mt-1.5"
                                        placeholder="0" />
                                    <span>-</span>
                                    <input type="text" name="max" id="max"
                                        class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)] mt-1.5"
                                        placeholder="10000+" />
                                </div>
                            </div>
                            <div class="mt-3">
                                <label for="continent" class="font-medium cursor-pointer">Continent</label>
                                <input type="text" name="continent" id="continent"
                                    class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)] mt-1.5"
                                    placeholder="Any" />
                            </div>
                            <div class="mt-3">
                                <label for="difficulty" class="font-medium cursor-pointer">Difficulty</label>
                                <input type="text" name="difficulty" id="difficulty"
                                    class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)] mt-1.5"
                                    placeholder="All" />
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
    const packs = PackModel.getByCategory(this.category.name);

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
        <button
          type="button"
          data-id="${pack.id}"
          class="border border-[var(--screen-bg)] text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer"
        >
          Know More
        </button>
      </div>
    `).join('');
  }

  handleSearch(e) {
    e.preventDefault();
    const formData = {
      departure: document.getElementById('departure').value,
      date: document.getElementById('date').value,
      adult: document.getElementById('adult').value,
      type: document.getElementById('type').value
    };
    // Implement search functionality here
  }

  setupEventListeners() {
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => this.handleSearch(e));
    }

    // Add event listeners for filter inputs if needed
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