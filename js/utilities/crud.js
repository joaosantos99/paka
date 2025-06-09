export class LocalStorageCRUD {
  create = (key, data) => {
    console.log(key, data);
    try {
      const serializedData = JSON.stringify(data);
      console.log(serializedData);
      localStorage.setItem(key, serializedData);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }

  read = (key) => {
    try {
      const serializedData = localStorage.getItem(key);
      return serializedData ? JSON.parse(serializedData) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }

  update = (key, data) => {
    try {
      if (!localStorage.getItem(key)) {
        return false;
      }
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
      return true;
    } catch (error) {
      console.error('Error updating localStorage:', error);
      return false;
    }
  }

  delete = (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error deleting from localStorage:', error);
      return false;
    }
  }

  clearAll = () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  getAllKeys = () => {
    return Object.keys(localStorage);
  }

  hasKey = (key) => {
    return localStorage.getItem(key) !== null;
  }
}

export default new LocalStorageCRUD();