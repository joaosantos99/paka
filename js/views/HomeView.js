export default class HomeView {
  constructor() {
    this.render();
    this.addEventListeners();
}

  getTemplate = () => `
    <!-- Header + Search Section Start -->
    <div class="sm:min-h-[750px] !bg-no-repeat !bg-cover !bg-center" style="background: url(../img/home-hero-bg.png)">
      <!-- Header Section Start -->
      <header class="sm:py-7 py-6">
        <nav class="flex items-center gap-5 justify-between max-w-7xl px-4 mx-auto">
          <a href="#">
            <img src="../img/light-logo.svg" alt="Logo" />
          </a>

          <ul class="sm:flex hidden gap-6 items-center text-[var(--screen-bg)]">
            <li><a href="#" class="text-sm">Mountains</a></li>
            <li><a href="#" class="text-sm">Water</a></li>
            <li><a href="#" class="text-sm">Deserts</a></li>
            <li><a href="#" class="text-sm">Forests</a></li>
            <li><a href="#" class="text-sm">Contacts</a></li>
          </ul>

          <a href="#">
            <img src="../img/icon/ic-user-light.svg" alt="User Icon" class="sm:block hidden" />
            <img src="../img/icon/ic-toggle-light.svg" alt="Toggle Icon" class="sm:hidden block" />
          </a>
        </nav>
      </header>
      <!-- Header Section End -->

      <!-- Search Filter Section Start -->
      <section class="max-w-7xl px-4 mx-auto sm:mt-[450px] mt-40 sm:translate-y-0 translate-y-40">
        <h4 class="text-3xl font-semibold text-[var(--screen-bg)] mb-3">Search for your next adventure!</h4>

        <div class="bg-[var(--light-bg-color)] p-4 rounded-md">
          <form class="grid sm:grid-cols-12 md:gap-6 gap-2">
            <div class="sm:col-span-10">
              <div class="grid sm:grid-cols-4 md:gap-6 gap-2">
                <input type="text" name="departure" id="departure" class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)]" placeholder="Departure" />
                <input type="text" name="date" id="date" class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)]" placeholder="Date" />
                <input type="text" name="adult" id="adult" class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)]" placeholder="1 Adult" />
                <input type="text" name="type" id="type" class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full bg-[var(--screen-bg)]" placeholder="Type" />
              </div>
            </div>

            <div class="sm:col-span-2">
              <button type="submit" class="bg-[var(--secondary-color)] text-white rounded-md h-12 px-2.5 w-full cursor-pointer">Search</button>
            </div>
          </form>
        </div>
      </section>
      <!-- Search Filter Section End -->
    </div>
    <!-- Header + Search Section End -->

    <!-- Adventure Section Start -->
    <div class="relative">
      <section class="max-w-7xl px-4 mx-auto sm:pt-24 pt-52 pb-24">
        <h3 class="md:text-5xl text-4xl font-semibold mb-4 uppercase md:leading-14 md:w-9/12 z-10 relative">
          Fuel your wanderlust and embark on unforgettable <span class="text-[var(--secondary-color)]">adventures.</span>
        </h3>
        <img src="../img/mountain-img.png" alt="Mountain Img" class="absolute right-0 bottom-0" />
      </section>
    </div>
    <!-- Adventure Section End -->

    <!-- Featured Categories Section Start -->
    ${this.getFeaturedCategoriesSection()}
    <!-- Featured Categories Section End -->

    <!-- Featured Packs Section Start -->
    ${this.getFeaturedPacksSection()}
    <!-- Featured Packs Section End -->
  `;

  getFeaturedCategoriesSection = () => `
    <section class="bg-[var(--light-bg-color)] py-12">
      <div class="max-w-7xl px-4 mx-auto">
        <h4 class="md:text-4xl text-3xl font-semibold md:mb-8 pb-5">Featured Categories</h4>
        <div class="md:grid md:grid-cols-12 flex gap-6 w-full overflow-x-auto">
          <div class="!bg-no-repeat !bg-cover !bg-center p-4 rounded-xl text-[var(--screen-bg)] md:col-span-6 min-h-[600px] min-w-80 flex items-end" style="background: url(../img/feature-card-img1.png)">
            <div>
              <img src="../img/icon/ic-mountain.svg" alt="Mountain Img" />
              <h5 class="mt-2 text-2xl font-semibold">Mountain</h5>
              <p class="md:w-10/12">Reach new heights and conquer the wild. Explore rugged peaks, hidden trails, and breathtaking horizons.</p>
              <button type="submit" class="bg-[var(--secondary-color)] text-white rounded-md h-12 px-10 mt-3 w-full cursor-pointer">Explore</button>
            </div>
          </div>

          <div class="!bg-no-repeat !bg-cover !bg-center p-4 rounded-xl text-[var(--screen-bg)] md:col-span-2 min-h-[600px] flex items-end" style="background: url(../img/feature-card-img2.png)">
            <div class="w-full">
              <img src="../img/icon/ic-water.svg" alt="Water Img" />
              <p class="mt-2 text-2xl font-semibold">Water</p>
              <button type="submit" class="border border-[var(--screen-bg)] text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer mt-3">Explore</button>
            </div>
          </div>

          <div class="!bg-no-repeat !bg-cover !bg-center p-4 rounded-xl text-[var(--screen-bg)] md:col-span-2 min-h-[600px] flex items-end" style="background: url(../img/feature-card-img3.png)">
            <div class="w-full">
              <img src="../img/icon/ic-cactus.svg" alt="Cactus Img" width="44" />
              <p class="mt-2 text-2xl font-semibold">Desert</p>
              <button type="submit" class="border border-[var(--screen-bg)] text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer mt-3">Explore</button>
            </div>
          </div>

          <div class="!bg-no-repeat !bg-cover !bg-center p-4 rounded-xl text-[var(--screen-bg)] md:col-span-2 min-h-[600px] flex items-end" style="background: url(../img/feature-card-img4.png)">
            <div class="w-full">
              <img src="../img/icon/ic-tree.svg" alt="Cactus Img" width="44" />
              <p class="mt-2 text-2xl font-semibold">Forest</p>
              <button type="submit" class="border border-[var(--screen-bg)] text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer mt-3">Explore</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  getFeaturedPacksSection = () => `
    <section class="py-12">
      <div class="max-w-7xl px-4 mx-auto">
        <h4 class="md:text-4xl text-3xl font-semibold">Featured Packs</h4>

        <div class="mt-8 mb-5 flex justify-between gap-5 items-center">
          <ul class="flex gap-2 overflow-x-auto">
            <li>
              <button type="button" class="border border-[var(--secondary-color)] py-2 px-8 rounded-md rounded-e-none cursor-pointer bg-[var(--secondary-color)] text-white font-medium w-36">Mountain</button>
            </li>
            <li>
              <button type="button" class="border border-[var(--primary-color)] py-2 px-8 cursor-pointer font-medium w-36">Water</button>
            </li>
            <li>
              <button type="button" class="border border-[var(--primary-color)] py-2 px-8 cursor-pointer font-medium w-36">Desert</button>
            </li>
            <li>
              <button type="button" class="border border-[var(--primary-color)] py-2 px-8 cursor-pointer font-medium rounded-e-md w-36">Forest</button>
            </li>
          </ul>
        </div>

        <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
          <div class="!bg-no-repeat !bg-cover !bg-center p-3 rounded-md text-[var(--screen-bg)] flex flex-col justify-between" style="background: url(../img/packs/1.png)">
            <div class="flex items-center justify-center gap-3">
              <img src="../img/icon/ic-mountain.svg" alt="Mountain Icon" width="34" />
            </div>
            <div class="text-center my-28">
              <h4 class="text-3xl font-semibold text-center">Nazaré <br />Canyon</h4>
              <p>11 to 15 April / 1760€</p>
            </div>
            <button type="submit" class="border border-[var(--screen-bg)] text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer md:col-span-2">Know More</button>
          </div>

          <div class="!bg-no-repeat !bg-cover !bg-center p-3 rounded-md text-[var(--screen-bg)] lg:col-span-2 flex flex-col justify-between" style="background: url(../img/packs/2.png)">
            <div class="flex items-center justify-center gap-3">
              <img src="../img/icon/ic-mountain.svg" alt="Mountain Icon" width="34" />
            </div>
            <div class="text-center my-28">
              <h4 class="text-3xl font-semibold text-center">Reforest <br />Iceland</h4>
              <p>11 to 15 April / 1760€</p>
            </div>
            <button type="submit" class="border border-[var(--screen-bg)] text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer md:col-span-2">Know More</button>
          </div>

          <div class="!bg-no-repeat !bg-cover !bg-center p-3 rounded-md text-[var(--screen-bg)] flex flex-col justify-between" style="background: url(../img/packs/3.png)">
            <div class="flex items-center justify-center gap-3">
              <img src="../img/icon/ic-cactus.svg" alt="Cactus Icon" width="34" />
              <img src="../img/icon/ic-mountain.svg" alt="Mountain Icon" width="34" />
            </div>
            <div class="text-center my-28">
              <h4 class="text-3xl font-semibold text-center">Petra and The Desert of Wadi Rum</h4>
              <p>11 to 15 April / 1760€</p>
            </div>
            <button type="submit" class="border border-[var(--screen-bg)] text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer md:col-span-2">Know More</button>
          </div>

          <div class="!bg-no-repeat !bg-cover !bg-center p-3 rounded-md text-[var(--screen-bg)] flex flex-col justify-between" style="background: url(../img/packs/4.png)">
            <div class="flex items-center justify-center gap-3">
              <img src="../img/icon/ic-mountain.svg" alt="Mountain Icon" width="34" />
            </div>
            <div class="text-center my-28">
              <h4 class="text-3xl font-semibold text-center w-10/12 mx-auto">Sanctuary of the Annapurnas</h4>
              <p>11 to 15 April / 1760€</p>
            </div>
            <button type="submit" class="border border-[var(--screen-bg)] text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer md:col-span-2">Know More</button>
          </div>

          <div class="!bg-no-repeat !bg-cover !bg-center p-3 rounded-md text-[var(--screen-bg)] flex flex-col justify-between" style="background: url(../img/packs/5.png)">
            <div class="flex items-center justify-center gap-3">
              <img src="../img/icon/ic-mountain.svg" alt="Mountain Icon" width="34" />
            </div>
            <div class="text-center my-28">
              <h4 class="text-3xl font-semibold text-center w-10/12 mx-auto">Mont Blanc</h4>
              <p>11 to 15 April / 1760€</p>
            </div>
            <button type="submit" class="border border-[var(--screen-bg)] text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer md:col-span-2">Know More</button>
          </div>

          <div class="!bg-no-repeat !bg-cover !bg-center p-3 rounded-md text-[var(--screen-bg)] lg:col-span-2 flex flex-col justify-between" style="background: url(../img/packs/6.png)">
            <div class="flex items-center justify-center gap-3">
              <img src="../img/icon/ic-mountain.svg" alt="Mountain Icon" width="34" />
              <img src="../img/icon/ic-cactus.svg" alt="Cactus Icon" width="34" />
              <img src="../img/icon/ic-tree.svg" alt="Tree Icon" width="34" />
            </div>
            <div class="text-center my-28">
              <h4 class="text-3xl font-semibold text-center">Mongolian Exploration</h4>
              <p>11 to 15 April / 1760€</p>
            </div>
            <button type="submit" class="border border-[var(--screen-bg)] text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer md:col-span-2">Know More</button>
          </div>
        </div>

        <button type="submit" class="border border-[var(--primary-bg)] text-[var(--primary-bg-color)] rounded-md h-12 px-12 w-fit mx-auto block cursor-pointer mt-6">Find More</button>
      </div>
    </section>
  `;

  addEventListeners() {
    const searchForm = document.querySelector('form');
    if (searchForm) {
      searchForm.addEventListener('submit', this.handleSearch);
    }
  }

  handleSearch = (e) => {
    e.preventDefault();
    // Handle search form submission
  }

  render() {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = this.getTemplate();
      this.addEventListeners();
    }
  }
}

new HomeView();