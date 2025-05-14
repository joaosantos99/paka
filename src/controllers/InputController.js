import { InputModel } from '@models/InputModel';

export class InputController {
  constructor(view) {
    this.view = view;
    this.model = new InputModel();
    this.view.setController(this);
  }
}
