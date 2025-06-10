class FileStorage {
  async saveFile(file) {
    // Check file size (localStorage limit is usually 5-10MB)
    if (file.size > 4 * 1024 * 1024) { // 4MB limit
      throw new Error('File size exceeds 4MB limit');
    }

    // Convert file to base64
    const base64Data = await this.fileToBase64(file);

    // Save to localStorage
    const fileData = {
      name: file.name,
      type: file.type,
      data: base64Data,
      lastModified: file.lastModified
    };

    // Generate a unique key for the file
    const fileKey = `file_${Date.now()}_${file.name}`;
    localStorage.setItem(fileKey, JSON.stringify(fileData));

    return fileKey;
  }

  // Helper method to convert File to base64
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  // Helper method to get file from localStorage
  getFile(fileKey) {
    try {
      const fileData = JSON.parse(localStorage.getItem(fileKey));
      if (!fileData) return null;

      // Convert base64 back to Blob
      const byteString = atob(fileData.data.split(',')[1]);
      const mimeString = fileData.data.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new File([ab], fileData.name, { type: fileData.type });
    } catch (error) {
      console.error('Error retrieving file:', error);
      return null;
    }
  }

  // Helper method to delete file from localStorage
  deleteFile(fileKey) {
    localStorage.removeItem(fileKey);
  }

  // Helper method to list all saved files
  listFiles() {
    const files = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('file_')) {
        try {
          const fileData = JSON.parse(localStorage.getItem(key));
          files.push({
            key: key,
            name: fileData.name,
            type: fileData.type,
            lastModified: fileData.lastModified
          });
        } catch (error) {
          console.error('Error parsing file data:', error);
        }
      }
    }
    return files;
  }
}

export default new FileStorage();