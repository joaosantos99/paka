class FileStorage {
  constructor() {
    this.dbName = 'FileStorageDB';
    this.storeName = 'files';
    this.dbPromise = this.initDB();
  }

  initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'key' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async saveFile(file) {
    if (file.size > 20 * 1024 * 1024) {
      throw new Error('File size exceeds 20MB limit');
    }

    const arrayBuffer = await file.arrayBuffer();
    const fileData = {
      key: `file_${Date.now()}_${file.name}`,
      name: file.name,
      type: file.type,
      data: arrayBuffer,
      lastModified: file.lastModified,
    };

    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      const request = store.put(fileData);

      request.onsuccess = () => resolve(fileData.key);
      request.onerror = () => reject(request.error);
    });
  }

  async getFile(fileKey) {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readonly');
      const store = tx.objectStore(this.storeName);
      const request = store.get(fileKey);

      request.onsuccess = () => {
        const data = request.result;
        if (!data) return resolve(null);
        resolve(new File([data.data], data.name, { type: data.type, lastModified: data.lastModified }));
      };
      request.onerror = () => reject(request.error);
    });
  }

  async deleteFile(fileKey) {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      const request = store.delete(fileKey);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async listFiles() {
    const db = await this.dbPromise;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(this.storeName, 'readonly');
      const store = tx.objectStore(this.storeName);
      const request = store.openCursor();

      const files = [];
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          const { key, name, type, lastModified } = cursor.value;
          files.push({ key, name, type, lastModified });
          cursor.continue();
        } else {
          resolve(files);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }
}

export default new FileStorage();
