import BaseAdminView from '/js/views/admin/BaseAdminView.js';
import PackModel from '/js/models/PackModel.js';
import ModalView from '/js/views/components/ModalView.js';
import CategoryModel from '/js/models/CategoryModel.js';
import FileStorage from '/js/utilities/fileStorage.js';

class PacksAdminView extends BaseAdminView {
  constructor({ model }) {
    super();
    this.model = model;
    Promise.all([
      this.renderView(),
    ]).then(() => {
      this.initializeEventListeners();
      this.initializeImageEventListeners();
    });
  }

  async renderView() {
    document.querySelector('tbody').innerHTML = await this.getPackRows();
  }

  async getPackRows() {
    const packs = this.model.getAll();

    await Promise.all(packs.map(async (pack) => {
      if (typeof pack.featuredImage === 'string' && pack.featuredImage.length > 0) {
        const featuredImage = await FileStorage.getFile(pack.featuredImage);
        pack.featuredImage = featuredImage ? URL.createObjectURL(featuredImage) : null;
      } else {
        pack.featuredImage = null;
      }

      if (pack.images.length > 0) {
        const images = await Promise.all(pack.images.map(async (image) => {
          const imageFile = await FileStorage.getFile(image);
          return imageFile ? URL.createObjectURL(imageFile) : null;
        }));
        pack.images = images;
      } else {
        pack.images = null;
      }
    }));

    return packs.map((pack, index) => `
            <tr id="pack-${pack.id}">
                <td>
                    <div class="border-s p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)] ${index === packs.length - 1 ? 'rounded-bl-md' : ''}">
                        ${pack.name}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${pack.price}
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${pack.categories}
                    </div>
                </td>
                <td class="${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''}">
                    <div class="border-b border-b-[var(--primary-color)]">
                        <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} truncate w-36">
                            ${pack.description}
                        </div>
                    </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${pack.startDate} ${pack.endDate ? `- ${pack.endDate}` : ''}
                    </div>
                </td>
                <td>
                   <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                    ${pack.featuredImage ? `<button type="button" class="featured-img-view-button cursor-pointer" data-image="${pack.featuredImage}">
                        View Image
                    </button>` : 'No Image'}
                  </div>
                </td>
                <td>
                    <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                        ${pack.images ? `<button type="button" class="images-view-button cursor-pointer" data-image="${pack.images}">
                            View Image
                        </button>` : 'No Image'}
                    </div>
                </td>
                <td>
                    <div class="p-[15.25px] ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-e border-b border-b-[var(--primary-color)] ${index === packs.length - 1 ? 'rounded-br-md' : ''}">
                        <button type="button" class="cursor-pointer">
                            <img src="../../img/icon/ic-edit.svg" alt="Edit Icon" class="me-2" />
                        </button>
                        <button type="button" class="cursor-pointer">
                            <img src="../../img/icon/ic-delete.svg" alt="Delete Icon" />
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
  }

  initializeImageEventListeners() {
    const featuredImageButton = document.querySelectorAll('.featured-img-view-button');
    featuredImageButton.forEach(button => {
      button.addEventListener('click', () => this.handleViewFeaturedImage(button.dataset.image));
    });

    const imagesButton = document.querySelectorAll('.images-view-button');
    imagesButton.forEach(button => {
      button.addEventListener('click', () => this.handleViewImages(button.dataset.image));
    });
  }

  handleViewFeaturedImage(image) {
    new ModalView({
      title: 'View Image',
      message: `<img class="max-w-50 w-full h-full m-auto object-contain" src="${image}" alt="Category Image" />`,
    }).show();
  }

  handleViewImages(images) {
    const splitImages = images.split(',');
    new ModalView({
      title: 'View Images',
      message: `
      <div class="flex flex-wrap gap-2">
        ${splitImages.map(image => `<img class="max-w-50 w-full h-full m-auto object-contain" src="${image}" alt="Category Image" />`).join('')}
      </div>`,
    }).show();
  }

  handleAddEntry() {
    new ModalView({
      title: 'Add Pack',
      fields: {
        name: {
          type: 'text',
          label: 'Name',
        },
        title: {
          type: 'text',
          label: 'Title',
        },
        description: {
          type: 'text',
          label: 'Description',
        },
        price: {
          type: 'number',
          label: 'Price',
        },
        categories: {
          type: 'checkbox-group',
          label: 'Categories',
          options: CategoryModel.getAll().map(category => ({
            value: category.name,
            label: category.name,
          })),
        },
        description: {
          type: 'text',
          label: 'Description',
        },
        startDate: {
          type: 'date',
          label: 'Start Date',
        },
        endDate: {
          type: 'date',
          label: 'End Date',
        },
        featuredImage: {
          type: 'file',
          label: 'Featured Image',
        },
        images: {
          type: 'file',
          label: 'Images',
          multiple: true,
        },
      },
      onSubmit: (data) => {
        this.model.create(data);
        this.hydrateView();
      }
    }).show();
  }

  handleEdit(row) {
    const packData = {
      name: row.querySelector('td:nth-child(1)').textContent.trim(),
      price: row.querySelector('td:nth-child(2)').textContent.trim(),
      categories: row.querySelector('td:nth-child(3)').textContent.trim(),
      description: row.querySelector('td:nth-child(4)').textContent.trim(),
      date: row.querySelector('td:nth-child(5)').textContent.trim()
    };
    console.log('Editing pack:', packData);
  }

  handleViewDetails(row, type) {
    const packName = row.querySelector('td:nth-child(1)').textContent.trim();
    console.log(`Viewing ${type} for pack:`, packName);
    // Implement view functionality for activities or images
  }
}

// Initialize the view when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PacksAdminView({ model: PackModel });
});