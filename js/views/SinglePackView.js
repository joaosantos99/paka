import HeaderView from '/js/views/HeaderView.js';
import PackModel from '/js/models/PackModel.js';
import FileStorage from '/js/utilities/FileStorage.js';

class SinglePackView {
  constructor() {
    this.packId = null;
    this.pack = null;

    const search = window.location.search;
    if (search) {
      const searchParams = new URLSearchParams(search);
      this.packId = searchParams.get('id');
    }

    if (!this.packId) {
      window.location.href = '/html/404.html';
    }

    this.pack = PackModel.getByPk(parseInt(this.packId));
    console.log(this.pack);

    Promise.all([this.render()])
      .then(() => {
        this.setupEventListeners();
      });
  }

  async render() {
    const main = document.querySelector('main');
    main.innerHTML = `
            <!-- Header + Search Section Start -->
            <div class="sm:min-h-[750px] !bg-no-repeat !bg-cover !bg-center" style="background: url(${await this.getImagePath(this.pack.featuredImage)})">
                <div id="lightHeaderContainer"></div>
                <div class="md:my-40 sm:my-44 mt-20 px-4">
                    <img src="/img/icon/ic-cactus.svg" alt="Cactus Img" width="82" class="mx-auto" />
                    <h1 class="md:text-6xl sm:text-5xl text-4xl max-w-2xl mx-auto text-center uppercase font-semibold text-[var(--screen-bg)] mt-3">
                        ${this.pack.name}
                    </h1>
                    <button type="submit"
                        class="bg-[var(--primary-color)] text-white rounded-md h-11 px-6 mt-3 sm:w-fit w-full mx-auto block cursor-pointer font-medium">
                        ${this.formatDateRange(this.pack.startDate, this.pack.endDate)} | ${this.pack.price}€
                    </button>
                </div>

                <!-- Search Filter Section Start -->
                <section class="sm:translate-y-0 bg-[var(--light-bg-color)]">
                    <div class="max-w-7xl px-4 mx-auto p-4 rounded-md">
                        <form id="reservationForm">
                            <div class="grid sm:grid-cols-4 md:gap-6 gap-2">
                                <input type="text" name="departure" id="departure"
                                    class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)]"
                                    placeholder="Departure" />
                                <input type="text" name="date" id="date"
                                    class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)]"
                                    placeholder="Returning" />
                                <input type="text" name="adult" id="adult"
                                    class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)]"
                                    placeholder="1 Adult" />
                                <button type="submit"
                                    class="bg-[var(--secondary-color)] text-white rounded-md h-12 px-10 w-full cursor-pointer">
                                    Add Reservations
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
                <!-- Search Filter Section End -->
            </div>
            <!-- Header + Search Section End -->

            <!-- Adventure Section Start -->
            <div class="relative">
                <section class="max-w-7xl px-4 mx-auto lg:pt-24 sm:pt-14 pt-52 md:pb-24 pb-14 grid md:grid-cols-2 items-center gap-5">
                    <h3 class="md:text-5xl text-4xl font-semibold md:mb-4 md:leading-14 md:w-9/12 z-10 relative text-[var(--secondary-color)]">
                        ${this.pack.title}
                    </h3>
                    <p class="text-base">
                        ${this.pack.description}
                    </p>
                </section>
            </div>
            <!-- Adventure Section End -->

            <!-- Image Carousel Section Start -->
            <section class="bg-[var(--light-bg-color)] py-12 relative overflow-x-hidden">
                <div class="max-w-7xl px-4 mx-auto flex sm:gap-6 gap-4" id="imageCarousel">
                    <!-- Images will be dynamically inserted here -->
                </div>
            </section>
            <!-- Image Carousel Section End -->

            <!-- Similar Packs Section Start -->
            <section class="py-12 overflow-x-hidden">
                <div class="max-w-7xl px-4 mx-auto flex md:items-center gap-6 md:flex-row flex-col">
                    <h4 class="md:text-4xl text-3xl font-semibold min-w-xs">
                        You may <span class="md:block hidden"></span> also Like!
                    </h4>
                    <div id="similarPacks" class="flex gap-6 overflow-x-auto">
                        <!-- Similar packs will be dynamically inserted here -->
                    </div>
                </div>
            </section>
            <!-- Similar Packs Section End -->
        `;

    await this.renderImageCarousel();
    this.renderSimilarPacks();
    new HeaderView();
  }

  async renderImageCarousel() {
    const images = await Promise.all(this.pack.images.map(async image => await this.getImagePath(image)));

    const carouselContainer = document.getElementById('imageCarousel');
    carouselContainer.innerHTML = images.map(image => `
            <img src="${image}" alt="Pack Image" class="md:w-2/5 sm:w-3/5 w-4/5" />
        `).join('');
  }

  async getImagePath(image) {
    const imageFile = await FileStorage.getFile(image);
    return imageFile ? URL.createObjectURL(imageFile) : null;
  }

  renderSimilarPacks() {
    const similarPacksData = [
      {
        image: '/img/packs/3.png',
        icons: ['cactus', 'tree'],
        title: 'Pack Name',
        date: '11 to 15 April',
        price: '1760€'
      },
      {
        image: '/img/packs/3.png',
        icons: ['cactus', 'tree'],
        title: 'Pack Name',
        date: '11 to 15 April',
        price: '1760€'
      },
      {
        image: '/img/packs/3.png',
        icons: ['cactus', 'tree'],
        title: 'Pack Name',
        date: '11 to 15 April',
        price: '1760€'
      }
    ];

    const packsContainer = document.getElementById('similarPacks');
    packsContainer.innerHTML = similarPacksData.map(pack => `
            <div class="!bg-no-repeat !bg-cover !bg-center p-3 rounded-md text-[var(--screen-bg)] flex flex-col justify-between md:min-w-md"
                style="background: url(${pack.image})">
                <div class="flex items-center justify-center gap-3">
                    ${pack.icons.map(icon => `
                        <img src="/img/icon/ic-${icon}.svg" alt="${icon} Icon" width="34" />
                    `).join('')}
                </div>
                <div class="text-center my-28">
                    <h4 class="text-3xl font-semibold text-center">${pack.title}</h4>
                    <p>${pack.date} / ${pack.price}</p>
                </div>
                <button type="button"
                    class="border border-[var(--screen-bg)] text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer">
                    Know More
                </button>
            </div>
        `).join('');
  }

  handleReservation(e) {
    e.preventDefault();
    const formData = {
      departure: document.getElementById('departure').value,
      date: document.getElementById('date').value,
      adult: document.getElementById('adult').value
    };
    console.log('Reservation form data:', formData);
    // Implement reservation functionality here
  }

  toggleItineraryContent(button) {
    const dayIndex = button.dataset.day;
    const content = document.querySelector(`[data-content="${dayIndex}"]`);
    content.classList.toggle('hidden');
  }

  setupEventListeners() {
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
      reservationForm.addEventListener('submit', (e) => this.handleReservation(e));
    }

    const itineraryButtons = document.querySelectorAll('.itinerary-btn');
    itineraryButtons.forEach(button => {
      button.addEventListener('click', () => this.toggleItineraryContent(button));
    });
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
  new SinglePackView();
});

export default SinglePackView;