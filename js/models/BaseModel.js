import LocalStorageCRUD from '/js/utilities/crud.js';

class BaseModel {
  create() {
    throw new Error('Method not implemented');
  }

  update(id, data) {
    const models = LocalStorageCRUD.read(this.modelName);
    const model = models.find(m => m.id === id);
    Object.assign(model, data);
    LocalStorageCRUD.update(this.modelName, models);
  }

  delete(id) {
    const models = LocalStorageCRUD.read(this.modelName);
    const model = models.find(m => m.id === id);
    model.deleted = true;
    LocalStorageCRUD.update(this.modelName, models);
  }

  getAll() {
    const models = LocalStorageCRUD.read(this.modelName);
    if (!models) {
      return [];
    }
    return models.filter(m => !m.deleted);
  }

  getByPk(id) {
    const model = LocalStorageCRUD.read(this.modelName).find(m => m.id === id);
    if (model.deleted) {
      return null;
    }
    return model;
  }

  getByField(field, value) {
    const models = LocalStorageCRUD.read(this.modelName);
    return models.find(m => m[field].toLowerCase() === value.toLowerCase());
  }
}

export default BaseModel;