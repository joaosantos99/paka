import LocalStorageCRUD from '/js/utilities/crud.js';
import BaseModel from '/js/models/BaseModel.js';

class PackModel extends BaseModel {
  constructor() {
    super();
    this.modelName = 'packs';
  }

  create({
    name,
    price,
    categories,
    title,
    description,
    startDate,
    endDate,
    featuredImage,
    images,
  }) {
    const packs = LocalStorageCRUD.read(this.modelName);
    const index = LocalStorageCRUD.read(`${this.modelName}-index`);

    const pack = {
      id: index + 1,
      name,
      price,
      categories,
      title,
      description,
      startDate,
      endDate,
      featuredImage,
      images,
      deleted: false,
    }

    packs.push(pack);
    LocalStorageCRUD.update(this.modelName, packs);
    LocalStorageCRUD.update(`${this.modelName}-index`, index + 1);

    return pack;
  }

  getByCategory(categoryName) {
    const packs = LocalStorageCRUD.read(this.modelName);
    return packs.filter(pack => {
      if (pack.categories && !pack.deleted) {
        return pack.categories.includes(categoryName);
      }
      return false;
    });
  }
}

export default new PackModel();