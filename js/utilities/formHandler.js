import FileStorage from './fileStorage.js';

class FormHandler {
  async handleFormSubmit(form, onSubmit) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Handle file uploads
    const fileInputs = form.querySelectorAll('input[type="file"]');
    for (const input of fileInputs) {
      if (input.files.length > 0) {
        const file = input.files[0];
        try {
          // Save file using FileStorage utility
          const fileKey = await FileStorage.saveFile(file);
          data[input.name] = fileKey;
        } catch (error) {
          console.error('Error saving file:', error);
        }
      }
    }

    // Call the onSubmit callback with the processed data
    if (onSubmit) {
      onSubmit(data);
    }

    return data;
  }

  generateFormFields(fields) {
    if (!fields) {
      return '';
    }

    return Object.entries(fields).map(([name, field]) => {
      const { type = 'text', label, value = '', placeholder = '' } = field;

      if (type === 'textarea') {
        return `
          <div class="mt-2">
            <label for="${name}" class="block text-sm font-medium text-gray-700">${label}</label>
            <textarea
              name="${name}"
              id="${name}"
              class="border rounded-md p-3.5 focus-within:outline-0 text-sm w-full resize-none"
              rows="5"
              placeholder="${placeholder}"
            >${value}</textarea>
          </div>
        `;
      }

      return `
        <div class="mt-2">
          <label for="${name}" class="block text-sm font-medium text-gray-700">${label}</label>
          <input
            type="${type}"
            name="${name}"
            id="${name}"
            class="border rounded-md h-12 p-3.5 focus-within:outline-0 text-sm w-full"
            placeholder="${placeholder}"
            value="${value}"
          />
        </div>
      `;
    }).join('');
  }
}

export default new FormHandler();