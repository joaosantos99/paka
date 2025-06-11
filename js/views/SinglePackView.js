class SinglePackView {
    constructor() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const main = document.querySelector('main');
        main.innerHTML = `
            <!-- Header + Search Section Start -->
            <div class="sm:min-h-[750px] !bg-no-repeat !bg-cover !bg-center" style="background: url(/img/pack-hero-bg.png)">
                <div class="md:my-40 sm:my-44 mt-20 px-4">
                    <img src="/img/icon/ic-cactus.svg" alt="Cactus Img" width="82" class="mx-auto" />
                    <h1 class="md:text-6xl sm:text-5xl text-4xl max-w-2xl mx-auto text-center uppercase font-semibold text-[var(--screen-bg)] mt-3">
                        Petra and the Desert of Wadi Rum
                    </h1>
                    <button type="submit"
                        class="bg-[var(--primary-color)] text-white rounded-md h-11 px-6 mt-3 sm:w-fit w-full mx-auto block cursor-pointer font-medium">
                        11 to 15 April | 1600€
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
                        Along the King's Highway
                    </h3>
                    <p class="text-base">
                        We travel along the ancient King's Highway, where for centuries thousands of camel caravans journeyed.
                        The destination is the sculptural and imposing Petra, carved into the rock by the Nabataeans and later
                        occupied by the Romans. We let ourselves be amazed by the landscape of one of the world's most scenic
                        deserts: Wadi Rum. In the company of the Bedouin people, we experience the routines of desert life and
                        sleep under an impressive star-filled sky. The journey ends with a dip in the Dead Sea, the lowest point
                        on the planet.
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

            <!-- Itinerary Section Start -->
            <section class="py-12">
                <div class="max-w-7xl px-4 mx-auto">
                    <h4 class="md:text-5xl text-4xl font-semibold">Itinerary</h4>
                    <div class="mt-8 grid md:grid-cols-2 gap-6">
                        <div id="itineraryAccordion">
                            <!-- Itinerary items will be dynamically inserted here -->
                        </div>
                        <div>
                            <img src="/img/map.png" alt="Map" class="w-full" />
                        </div>
                    </div>
                </div>
            </section>
            <!-- Itinerary Section End -->

            <!-- Similar Packs Section Start -->
            <section class="bg-[var(--light-bg-color)] py-12 overflow-x-hidden">
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

        this.renderImageCarousel();
        this.renderItinerary();
        this.renderSimilarPacks();
    }

    renderImageCarousel() {
        const images = [
            '/img/contact-hero-bg.png',
            '/img/desert-hero-bg.png',
            '/img/desert-hero-bg.png'
        ];

        const carouselContainer = document.getElementById('imageCarousel');
        carouselContainer.innerHTML = images.map(image => `
            <img src="${image}" alt="Pack Image" class="md:w-2/5 sm:w-3/5 w-4/5" />
        `).join('');
    }

    renderItinerary() {
        const itineraryData = [
            {
                day: 'Day 1 - Arrival in Amman',
                description: 'Welcome to Jordan! Upon arrival at Queen Alia International Airport, youll be greeted by our local team and transferred to your hotel in Amman. Depending on arrival time, enjoy a welcome briefing with your guide and fellow travelers. The evening is free to rest or explore the vibrant streets of the capital, a city where modern life meets ancient heritage.'
            },
            {
                day: 'Day 2 - The Kings Highway to Petra',
                description: ''
            },
            {
                day: 'Day 3 - Explore Petra',
                description: ''
            },
            {
                day: 'Day 4 - Wadi Rum Desert Adventure',
                description: ''
            },
            {
                day: 'Day 5 - Dead Sea and Departure',
                description: ''
            }
        ];

        const accordionContainer = document.getElementById('itineraryAccordion');
        accordionContainer.innerHTML = itineraryData.map((item, index) => `
            <div class="mb-3">
                <button type="button" data-day="${index}"
                    class="bg-[var(--primary-color)] text-white rounded-md h-14 px-4 sm:text-lg text-base w-full text-start cursor-pointer font-medium itinerary-btn">
                    ${item.day}
                </button>
                <p class="px-4 text-base mt-3 mb-6 ${index === 0 ? '' : 'hidden'}" data-content="${index}">
                    ${item.description}
                </p>
            </div>
        `).join('');
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
}

// Initialize the view when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SinglePackView();
});

export default SinglePackView;