class CategoriesPacksView {
    constructor() {
        this.packContainer = document.getElementById('packContainer');
        this.searchForm = document.getElementById('searchForm');
        this.packs = [
            {
                name: "Nazaré Canyon",
                date: "11 to 15 April",
                price: "1760€",
                image: "../img/packs/1.png",
                icons: ["water"],
                category: "water"
            },
            {
                name: "Petra and The Desert of Wadi Rum",
                date: "11 to 15 April",
                price: "1760€",
                image: "../img/packs/3.png",
                icons: ["cactus", "tree"],
                category: "desert"
            },
            {
                name: "Reforest Iceland",
                date: "11 to 15 April",
                price: "1760€",
                image: "../img/packs/2.png",
                icons: ["tree"],
                category: "forest"
            },
            {
                name: "Meteora and the Land of the Gods",
                date: "11 to 15 April",
                price: "1760€",
                image: "../img/packs/7.png",
                icons: ["mountain", "tree"],
                category: "mountain"
            },
            {
                name: "Sanctuary of the Annapurnas",
                date: "11 to 15 April",
                price: "1760€",
                image: "../img/packs/4.png",
                icons: ["mountain"],
                category: "mountain"
            },
            {
                name: "Mongolian Exploration",
                date: "11 to 15 April",
                price: "1760€",
                image: "../img/packs/6.png",
                icons: ["mountain", "cactus", "tree"],
                category: "mixed"
            },
            {
                name: "The Heart of Alaska",
                date: "11 to 15 April",
                price: "1760€",
                image: "../img/packs/8.png",
                icons: ["tree", "water", "mountain"],
                category: "mixed"
            },
            {
                name: "Namibian Desert",
                date: "11 to 15 April",
                price: "1760€",
                image: "../img/packs/9.png",
                icons: ["cactus"],
                category: "desert"
            },
            {
                name: "Mont Blanc",
                date: "11 to 15 April",
                price: "1760€",
                image: "../img/packs/5.png",
                icons: ["mountain"],
                category: "mountain"
            }
        ];

        this.init();
    }

    init() {
        this.renderPacks();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Handle search form submission
            const formData = new FormData(this.searchForm);
            const searchData = {
                departure: formData.get('departure'),
                date: formData.get('date'),
                adult: formData.get('adult'),
                type: formData.get('type')
            };
            console.log('Search data:', searchData);
            // Implement search functionality here
        });
    }

    getIconPath(iconName) {
        return `../img/icon/ic-${iconName}.svg`;
    }

    createPackCard(pack) {
        const cardDiv = document.createElement('div');
        cardDiv.className = '!bg-no-repeat !bg-cover !bg-center p-3 rounded-md text-[var(--screen-bg)] flex flex-col justify-between';
        cardDiv.style.background = `url(${pack.image})`;

        const iconsDiv = document.createElement('div');
        iconsDiv.className = 'flex items-center justify-center gap-3';
        pack.icons.forEach(icon => {
            const img = document.createElement('img');
            img.src = this.getIconPath(icon);
            img.alt = `${icon} Icon`;
            img.width = 34;
            iconsDiv.appendChild(img);
        });

        const contentDiv = document.createElement('div');
        contentDiv.className = 'text-center my-16';
        contentDiv.innerHTML = `
            <h4 class="text-3xl font-semibold text-center">${pack.name}</h4>
            <p>${pack.date} / ${pack.price}</p>
        `;

        const button = document.createElement('button');
        button.type = 'submit';
        button.className = 'border border-[var(--screen-bg)] text-[var(--light-bg-color)] rounded-md h-12 px-1.5 w-full cursor-pointer';
        button.textContent = 'Know More';

        cardDiv.appendChild(iconsDiv);
        cardDiv.appendChild(contentDiv);
        cardDiv.appendChild(button);

        return cardDiv;
    }

    renderPacks() {
        const container = this.packContainer.querySelector('.grid');
        container.innerHTML = '';

        this.packs.forEach(pack => {
            const card = this.createPackCard(pack);
            container.appendChild(card);
        });
    }
}

// Initialize the view
document.addEventListener('DOMContentLoaded', () => {
    new CategoriesPacksView();
});