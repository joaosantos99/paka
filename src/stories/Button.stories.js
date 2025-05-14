import '@views/buttonView';
import { ButtonController } from '@controllers/ButtonController.js';

export default {
  title: 'Example/Button',
  tags: ['autodocs'],
  args: {
    size: "default",
    style: "primary",
  },
  argTypes: {
    size: {
      control: 'text',
      description: 'Value of the input',
    },
    style: {
      control: 'text',
      description: 'Text shown in the input placeholder',
    },
  },
  render: (args) => {
    const element = document.createElement('button-component');

    console.log(element)

    if (args.size) {
      element.setAttribute('size', args.size);
    }
    if (args.style) {
      element.setAttribute('style', args.style);
    }

    // Initialize controller after component connects
    setTimeout(() => {
      new ButtonController(element);
    });

    return element;
  },
  argTypes: {
    size: { control: 'text' },
  },
};

export const Primary = {
  args: {
    size: "default",
    style: "primary",
  },
};
