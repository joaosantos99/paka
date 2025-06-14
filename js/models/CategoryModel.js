import LocalStorageCRUD from '/js/utilities/crud.js';
import BaseModel from '/js/models/BaseModel.js';

class CategoryModel extends BaseModel {
  constructor() {
    super();
    this.modelName = 'categories';
  }

  create({
    name,
    description,
    featuredImage,
    icon,
  }) {
    const categories = LocalStorageCRUD.read(this.modelName);
    const index = LocalStorageCRUD.read(`${this.modelName}-index`);

    const category = {
      id: index + 1,
      name,
      description,
      featuredImage,
      icon,
      numberOfPacks: 0,
      deleted: false,
    }

    categories.push(category);
    LocalStorageCRUD.update(this.modelName, categories);
    LocalStorageCRUD.update(`${this.modelName}-index`, index + 1);

    return category;
  }
}

export default new CategoryModel();