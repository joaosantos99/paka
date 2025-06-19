import FileStorage from '/js/utilities/fileStorage.js';
class BaseView {
  async renderView() {
    const container = document.querySelector('main');
    if (!container) return;

    container.innerHTML = await this.getTemplate();
  }

  initializeEventListeners() {
    throw new Error('Method not implemented');
  }

  hydrateView() {
    throw new Error('Method not implemented');
  }

  getTemplate() {
    throw new Error('Method not implemented');
  }

  async getImagePath(image) {
    const imageFile = await FileStorage.getFile(image);
    return imageFile ? URL.createObjectURL(imageFile) : null;
  }
}

export default BaseView;
