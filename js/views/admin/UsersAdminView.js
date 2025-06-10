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

  getTemplate() {
    return `
      <div class="mt-8 flex items-center gap-5 justify-between">
        <h4 class="text-3xl font-semibold">Dashboard</h4>
        <button id="addEntryButton" type="button" class="border border-[var(--primary-color)] py-2 px-8 rounded-md cursor-pointer lg:hidden block">
          Add Entry
        </button>
      </div>

      <div class="my-5 flex justify-between gap-5 items-center">
        <ul class="flex gap-2 overflow-x-auto">
          <li>
            <a href="packs.html">
              <button type="button" class="border border-[var(--primary-color)] rounded-md rounded-e-none py-2 px-8 cursor-pointer font-medium w-36">
                Packs
              </button>
            </a>
          </li>
          <li>
            <a href="categories.html">
              <button type="button" class="border border-[var(--primary-color)] py-2 px-8 cursor-pointer font-medium w-36">
                Categories
              </button>
            </a>
          </li>
          <li>
            <a href="flights.html">
              <button type="button" class="border border-[var(--primary-color)] py-2 px-8 cursor-pointer font-medium w-36">
                Flights
              </button>
            </a>
          </li>
          <li>
            <a href="users.html">
              <button type="button" class="border border-[var(--secondary-color)] py-2 px-8 cursor-pointer bg-[var(--secondary-color)] text-white font-medium w-36">
                Users
              </button>
            </a>
          </li>
          <li>
            <a href="search.html">
              <button type="button" class="border border-[var(--primary-color)] py-2 px-8 cursor-pointer font-medium rounded-e-md w-36">
                Search
              </button>
            </a>
          </li>
        </ul>

        <button id="addEntryButton" type="button" class="border border-[var(--primary-color)] py-2 px-8 rounded-md cursor-pointer lg:block hidden">
          Add Entry
        </button>
      </div>

      <div class="w-full overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-[var(--screen-bg)]">
              <th scope="col">
                <div class="text-left bg-black px-4 py-5 border border-black rounded-tl-md text-nowrap">
                  Name
                </div>
              </th>
              <th scope="col">
                <div class="text-left bg-black px-4 py-5 border border-black text-nowrap">
                  Email
                </div>
              </th>
              <th scope="col">
                <div class="text-left bg-black px-4 py-5 border border-black text-nowrap">
                  Favourites Count
                </div>
              </th>
              <th scope="col">
                <div class="bg-black text-left px-4 py-5 border border-black text-nowrap">
                  Type
                </div>
              </th>
              <th scope="col">
                <div class="bg-black text-left px-4 py-5 border border-black text-nowrap">
                  Last Access
                </div>
              </th>
              <th scope="col">
                <div class="bg-black text-left px-4 py-5 border border-black rounded-tr-md text-black">
                  Action
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            ${this.getUserRows()}
          </tbody>
        </table>
      </div>
    `;
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