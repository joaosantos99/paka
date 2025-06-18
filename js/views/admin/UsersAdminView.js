import BaseAdminView from '/js/views/admin/BaseAdminView.js';
import UserModel from '/js/models/UserModel.js';
import ModalView from '/js/views/components/ModalView.js';

class UsersAdminView extends BaseAdminView {
  constructor({ model }) {
    super();
    this.model = model;
    this.renderView();
    this.initializeEventListeners();
  }

  renderView() {
    document.querySelector('tbody').innerHTML = this.getUserRows();
  }

  getUserRows() {
    // This would typically fetch data from an API
    const users = this.model.getAll();

    return users.map((user, index) => `
      <tr id="user-${user.id}">
        <td>
          <div class="border-s p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)] ${index === users.length - 1 ? 'rounded-bl-md' : ''}">
            ${user.name}
          </div>
        </td>
        <td>
          <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
            ${user.email}
          </div>
        </td>
        <td>
          <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)] truncate">
            ${user.favoritesCount}
          </div>
        </td>
        <td>
          <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
            ${user.isAdmin ? 'Admin' : 'User'}
          </div>
        </td>
        <td>
          <div class="p-4 ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-b border-b-[var(--primary-color)]">
            ${user.lastAccess ? user.lastAccess : 'Never'}
          </div>
        </td>
        <td>
          <div class="p-[15.25px] ${index % 2 === 0 ? 'bg-[var(--light-bg-color)]' : ''} text-nowrap border-e border-b border-b-[var(--primary-color)] ${index === users.length - 1 ? 'rounded-br-md' : ''}">
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

  handleAddEntry() {
    new ModalView({
      title: 'Add User',
      fields: {
        name: {
          type: 'text',
          label: 'Name',
        },
        email: {
          type: 'email',
          label: 'Email',
        },
        password: {
          type: 'password',
          label: 'Password',
        },
        isAdmin: {
          type: 'checkbox',
          label: 'Is Admin',
        },
      },
      onSubmit: (data) => {
        this.model.create(data);
        this.hydrateView();
      }
    }).show();
  }

  handleEdit(row) {
    const userId = parseInt(row.id.split('-')[1]);
    const user = this.model.getByPk(userId);
    new ModalView({
      title: 'Edit User',
      fields: {
        name: {
          type: 'text',
          label: 'Name',
          value: user.name
        },
        email: {
          type: 'email',
          label: 'Email',
          value: user.email
        },
        password: {
          type: 'password',
          label: 'Password',
          value: user.password
        },
      },
      onSubmit: (data) => {
        this.model.update(userId, data);
        this.hydrateView();
      }
    }).show();

    this.hydrateView();
  }
}

// Initialize the view when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new UsersAdminView({ model: UserModel });
});