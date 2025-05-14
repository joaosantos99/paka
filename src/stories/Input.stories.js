import '@views/InputView';
import { InputController } from '@controllers/InputController.js';
import { INPUTS } from '@constants/InputConstants.js';

export default {
  title: 'Example/Input',
  tags: ['autodocs'],
  args: {
    placeholder: 'Placeholder',
    type: 'text',
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Value of the input',
    },
    placeholder: {
      control: 'text',
      description: 'Text shown in the input placeholder',
    },
    type: {
      control: {
        type: 'radio',
      },
      options: Object.values(INPUTS),
      description: 'Type of input',
    },
    error: {
      control: 'text',
      description: 'Error message to be displayed',
    },
  },
  render: (args) => {
    const element = document.createElement('input-component');

    if (args.value) {
      element.setAttribute('value', args.value);
    }
    if (args.type) {
      element.setAttribute('type', args.type);
    }
    if (args.placeholder) {
      element.setAttribute('placeholder', args.placeholder);
    }
    if (args.error) {
      element.setAttribute('error', args.error);
    }

    // Initialize controller after component connects
    setTimeout(() => {
      new InputController(element);
    });

    return element;
  },
  argTypes: {
    placeholder: { control: 'text' },
  },
};

export const Text = {
  args: {
    value: "",
    placeholder: 'Text placeholder',
    type: INPUTS.TEXT,
    error: "",
  },
};
