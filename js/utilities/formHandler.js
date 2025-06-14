import FileStorage from './fileStorage.js';

class FormHandler {
  async handleFormSubmit(form, onSubmit) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Handle file uploads
    const fileInputs = form.querySelectorAll('input[type="file"]');
    for (const input of fileInputs) {
      if (input.files.length > 0) {
        try {
          // Handle multiple files if the input allows it
          if (input.multiple) {
            const fileKeys = await Promise.all(
              Array.from(input.files).map(file => FileStorage.saveFile(file))
            );
            console.log(fileKeys);
            data[input.name] = fileKeys;
          } else {
            // Single file handling
            const file = input.files[0];
            const fileKey = await FileStorage.saveFile(file);
            data[input.name] = fileKey;
          }
        } catch (error) {
          console.error('Error saving file(s):', error);
        }
      }
    }

    // Convert checkbox group values to array
    const checkboxGroups = form.querySelectorAll('input[type="checkbox"]');
    const groupedData = {};
    checkboxGroups.forEach(checkbox => {
      const name = checkbox.name.replace('[]', '');
      if (checkbox.checked) {
        if (!groupedData[name]) {
          groupedData[name] = [];
        }
        groupedData[name].push(checkbox.value);
      }
    });

    // Merge checkbox group data with form data
    Object.assign(data, groupedData);

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
      const { type = 'text', label, value = '', placeholder = '', multiple, options } = field;

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

      if (type === 'checkbox-group') {
        return `
          <div class="mt-2">
            <label class="block text-sm font-medium text-gray-700">${label}</label>
            <div class="grid grid-cols-2 gap-2">
              ${options.map(option => `
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    name="${name}[]"
                    id="${name}_${option.value}"
                    value="${option.value}"
                    class="h-4 w-4 rounded border-gray-300"
                  />
                  <label for="${name}_${option.value}" class="ml-2 text-sm text-gray-700">${option.label}</label>
                </div>
              `).join('')}
            </div>
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
            ${multiple ? 'multiple' : ''}
          />
        </div>
      `;
    }).join('');
  }
}

export default new FormHandler();