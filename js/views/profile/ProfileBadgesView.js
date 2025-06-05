class ProfileBadgesView {
    constructor() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const main = document.querySelector('main');
        main.innerHTML = `
            <!-- Profile Settings Section Start -->
            <div class="relative overflow-x-hidden">
                <section class="max-w-7xl px-4 mx-auto">
                    <div class="mt-8 flex justify-between items-center flex-col">
                        <div class="text-center">
                            <img src="/img/user-profile.svg" alt="User Profile" class="mx-auto" />
                            <h4 class="text-5xl font-semibold mt-6 mb-1.5">John Doe</h4>
                            <a href="mailto:johndoe@gmail.com" class="text-lg">johndoe@gmail.com</a>
                        </div>

                        <div class="p-4 rounded-xl bg-[var(--light-bg-color)] lg:flex hidden items-center gap-4 mt-10">
                            <img src="/img/icon/ic-filled-globe.svg" alt="Filled Globe Img" />
                            <img src="/img/icon/ic-empty-globe.svg" alt="Empty Globe Img" />
                            <img src="/img/icon/ic-empty-globe.svg" alt="Empty Globe Img" />
                            <img src="/img/icon/ic-empty-globe.svg" alt="Empty Globe Img" />
                            <img src="/img/icon/ic-empty-globe.svg" alt="Empty Globe Img" />
                            <img src="/img/icon/ic-empty-globe.svg" alt="Empty Globe Img" />
                            <img src="/img/icon/ic-empty-globe.svg" alt="Empty Globe Img" />
                        </div>
                    </div>
                </section>
            </div>

            <div class="max-w-7xl px-4 mx-auto mb-20">
                <ul class="sm:flex hidden gap-2 justify-center mt-16 mb-12 overflow-x-auto w-full">
                    <li>
                        <button type="button" data-tab="settings"
                            class="border border-[var(--primary-color)] py-2 px-8 rounded-md rounded-e-none cursor-pointer font-medium w-36">
                            Settings
                        </button>
                    </li>

                    <li>
                        <button type="button" data-tab="reservations"
                            class="border border-[var(--primary-color)] py-2 px-8 cursor-pointer font-medium w-36">
                            Reservations
                        </button>
                    </li>

                    <li>
                        <button type="button" data-tab="badges"
                            class="border border-[var(--secondary-color)] py-2 px-8 cursor-pointer font-medium rounded-e-md w-36 bg-[var(--secondary-color)] text-white">
                            Badges
                        </button>
                    </li>
                </ul>

                <div class="sm:hidden block my-10">
                    <div class="!bg-no-repeat !bg-cover !bg-center p-3 rounded-md text-[var(--screen-bg)]"
                        style="background: url(/img/profile-card-img.png)">
                        <div class="flex items-center justify-center gap-3">
                            <img src="/img/icon/ic-cactus.svg" alt="Cactus Icon" />
                            <img src="/img/icon/ic-tree.svg" alt="Tree Icon" />
                        </div>

                        <div class="text-center my-16">
                            <h4 class="text-3xl font-semibold text-center">Pack Name</h4>
                            <p>11 to 15 April / 1760€</p>
                        </div>

                        <button type="button"
                            class="border border-[var(--screen-bg)] text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer md:col-span-2">
                            Know More
                        </button>
                    </div>
                </div>

                <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 sm:mt-20 mt-10" id="badgesGrid">
                    <!-- Badges will be dynamically inserted here -->
                </div>
            </div>
            <!-- Profile Settings Section End -->
        `;

        this.renderBadges();
    }

    renderBadges() {
        const badges = [
            {
                achieved: true,
                title: 'World Traveler',
                description: 'Travel to 5 different continents in 1 year',
                reward: '5% discount'
            },
            {
                achieved: false,
                title: 'World Traveler',
                description: 'Travel to 5 different continents in 1 year',
                reward: '5% discount'
            },
            {
                achieved: false,
                title: 'World Traveler',
                description: 'Travel to 5 different continents in 1 year',
                reward: '5% discount'
            },
            {
                achieved: false,
                title: 'World Traveler',
                description: 'Travel to 5 different continents in 1 year',
                reward: '5% discount'
            }
        ];

        const badgesContainer = document.getElementById('badgesGrid');
        badgesContainer.innerHTML = badges.map(badge => `
            <div class="pb-4 pt-8 px-5 rounded-xl bg-[var(--light-bg-color)] flex flex-col justify-center items-center text-center ${badge.achieved ? '' : 'opacity-50'}">
                <img src="/img/icon/ic-filled-globe.svg" alt="Filled Globe" />
                <h5 class="font-semibold text-2xl mt-3">${badge.title}</h5>
                <p class="w-10/12 leading-4">${badge.description}</p>
                <div class="text-base mt-10">
                    Reward:
                    <span class="text-[var(--secondary-color)] font-semibold">${badge.reward}</span>
                </div>
            </div>
        `).join('');
    }

    handleTabChange(button) {
        // Remove active state from all tabs
        const allTabs = document.querySelectorAll('[data-tab]');
        allTabs.forEach(tab => {
            tab.classList.remove('bg-[var(--secondary-color)]', 'text-white');
            tab.classList.add('border-[var(--primary-color)]');
        });

        // Add active state to clicked tab
        button.classList.add('bg-[var(--secondary-color)]', 'text-white');
        button.classList.remove('border-[var(--primary-color)]');

        // Here you would typically handle the content change based on the tab
        const tabName = button.dataset.tab;
        console.log('Switching to tab:', tabName);
        // Implement tab content switching functionality here
    }

    setupEventListeners() {
        const tabButtons = document.querySelectorAll('[data-tab]');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => this.handleTabChange(button));
        });
    }
}

// Initialize the view when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProfileBadgesView();
});

export default ProfileBadgesView;