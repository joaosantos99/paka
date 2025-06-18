import BaseAdminView from '/js/views/admin/BaseAdminView.js';
import CategoryModel from '/js/models/CategoryModel.js';
import ModalView from '/js/views/components/ModalView.js';
import FileStorage from '/js/utilities/fileStorage.js';

class CategoriesAdminView extends BaseAdminView {
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
    document.querySelector('tbody').innerHTML = await this.getCategoryRows();
  }

  async getCategoryRows() {
    const categories = this.model.getAll();

    categories.forEach(async category => {
      if (category.featuredImage.length > 0) {
        const featuredImage = await FileStorage.getFile(category.featuredImage);
        category.featuredImage = featuredImage ? URL.createObjectURL(featuredImage) : null;
      }
      if (category.icon.length > 0) {
        const icon = await FileStorage.getFile(category.icon);
        category.icon = icon ? URL.createObjectURL(icon) : null;
      }
      category.icon = icon ? URL.createObjectURL(icon) : null;
    });

    return categories.map((category, index) => `
        <tr id="category-${category.id}">
            <td>
                <div class="border-s p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)] ${index === categories.length - 1 ? 'rounded-bl-md' : ''}">
                    ${category.name}
                </div>
            </td>
            <td>
                <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)] truncate">
                    ${category.description}
                </div>
            </td>
            <td>
                <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                    ${category.numberOfPacks}
                </div>
            </td>
            <td>
                <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                    ${category.featuredImage ? `<button type="button" class="img-view-button cursor-pointer" data-image="${category.featuredImage}">
                        View Image
                    </button>` : 'No Image'}
                </div>
            </td>
            <td>
                <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
                    ${category.icon ? `<button type="button" class="icon-view-button cursor-pointer" data-image="${category.icon}">
                        View Icon
                    </button>` : 'No Icon'}
                </div>
            </td>
            <td>
                <div class="p-[15.25px] ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-e border-b border-b-[var(--primary-color)] ${index === categories.length - 1 ? 'rounded-br-md' : ''}">
                    <button type="button" class="cursor-pointer">
                        <img src="/img/icon/ic-edit.svg" alt="Edit Icon" class="me-2" />
                    </button>
                    <button type="button" class="cursor-pointer">
                        <img src="/img/icon/ic-delete.svg" alt="Delete Icon" />
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
  }

  initializeImageEventListeners() {
    const imageButtons = document.querySelectorAll('.img-view-button');
    imageButtons.forEach(button => {
      button.addEventListener('click', () => this.handleViewImage(button.dataset.image));
    });

    const iconButtons = document.querySelectorAll('.icon-view-button');
    iconButtons.forEach(button => {
      button.addEventListener('click', () => this.handleViewIcon(button.dataset.image));
    });
  }

  handleViewImage(image) {
    new ModalView({
      title: 'View Image',
      message: `<img class="max-w-50 w-full h-full m-auto object-contain" src="${image}" alt="Category Image" />`,
    }).show();
  }

  handleViewIcon(icon) {
    new ModalView({
      title: 'View Icon',
      message: `<img class="max-w-50 w-full h-full m-auto object-contain" src="${icon}" alt="Category Icon" />`,
    }).show();
  }

  handleAddEntry() {
    new ModalView({
      title: 'Add Category',
      fields: {
        name: {
          type: 'text',
          label: 'Name',
        },
        description: {
          type: 'text',
          label: 'Description',
        },
        featuredImage: {
          type: 'file',
          label: 'Featured Image',
        },
        icon: {
          type: 'file',
          label: 'Icon',
        },
      },
      onSubmit: (data) => {
        this.model.create(data);
        this.hydrateView();
      }
    }).show();
  }

  handleEdit(row) {
    const categoryId = parseInt(row.id.split('-')[1]);
    const category = this.model.getByPk(categoryId);
    new ModalView({
      title: 'Edit User',
      fields: {
        name: {
          type: 'text',
          label: 'Name',
          value: category.name
        },
        description: {
          type: 'text',
          label: 'Description',
          value: category.description
        },
        featuredImage: {
          type: 'file',
          label: 'Featured Image',
          value: category.featuredImage
        },
        icon: {
          type: 'file',
          label: 'Icon',
          value: category.icon
        },
      },
      onSubmit: (data) => {
        this.model.update(categoryId, data);
        this.hydrateView();
      }
    }).show();
  }

  handleNavigation(page) {
    const routes = {
      'packs': 'packs.html',
      'categories': 'categories.html',
      'flights': 'flights.html',
      'users': 'users.html',
      'search': 'search.html'
    };

    if (routes[page]) {
      window.location.href = routes[page];
    }
  }
}

// Initialize the view when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CategoriesAdminView({ model: CategoryModel });
});