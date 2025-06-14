import BaseView from '/js/views/BaseView.js';
import ModalView from '/js/views/components/ModalView.js';

class BaseAdminView extends BaseView {
  initializeEventListeners() {
    // Add Entry button
    const addEntryButton = document.querySelectorAll('#addEntryButton');
    if (addEntryButton) {
      addEntryButton.forEach(button => {
        button.addEventListener('click', () => {
          this.handleAddEntry();
        });
      });
    }

    // Edit buttons
    const editButtons = document.querySelectorAll('img[alt="Edit Icon"]');
    editButtons.forEach(button => {
      button.closest('button').addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        this.handleEdit(row);
      });
    });

    // Delete buttons
    const deleteButtons = document.querySelectorAll('img[alt="Delete Icon"]');
    deleteButtons.forEach(button => {
      button.closest('button').addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        this.handleDelete(row);
      });
    });

    // Navigation buttons
    const navButtons = document.querySelectorAll('ul button');
    navButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const page = e.target.textContent.trim().toLowerCase();
        this.handleNavigation(page);
      });
    });
  }

  hydrateView() {
    const data = this.model.getAll();
    const mainContent = document.querySelector('main');
    if (!mainContent) return;
    mainContent.innerHTML = this.getTemplate(data);
    this.initializeEventListeners();
  }

  handleDelete(row) {
    const dataId = parseInt(row.id.split('-')[1]);

    new ModalView({
      title: 'Delete Entry',
      message: 'Are you sure you want to delete this entry?',
      onSubmit: () => {
        this.model.delete(dataId);
        this.hydrateView();
      }
    }).show();
    // if (confirm(`Are you sure you want to delete the user?`)) {
    //   this.model.delete(dataId);
    //   this.hydrateView();
    // }
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

  handleAddEntry() {
    throw new Error('Method handleAddEntry must be implemented by child class');
  }
}

export default BaseAdminView;