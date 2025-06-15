import LocalStorageCRUD from '/js/utilities/crud.js';
import BaseModel from '/js/models/BaseModel.js';

class ContactModel extends BaseModel {
  constructor() {
    super();
    this.modelName = 'contacts';
  }

  create({
    name,
    email,
    message,
  }) {
    const contacts = LocalStorageCRUD.read(this.modelName);
    const index = LocalStorageCRUD.read(`${this.modelName}-index`);

    const contact = {
      id: index + 1,
      name,
      email,
      message,
      deleted: false,
    }

    contacts.push(contact);
    LocalStorageCRUD.update(this.modelName, contacts);
    LocalStorageCRUD.update(`${this.modelName}-index`, index + 1);

    return contact;
  }
}

export default new ContactModel();