import LocalStorageCRUD from '/js/utilities/crud.js';
import BaseModel from '/js/models/BaseModel.js';

class SearchModel extends BaseModel {
  constructor() {
    super();
    this.modelName = 'search';
  }

  create({
    category,
    departingDate,
    returningDate,
    stops,
    difficulty,
    min,
    max,
    continent,
    numberOfPeople,
    departure,
    userId,
    userName,
  }) {
    const searches = LocalStorageCRUD.read(this.modelName);
    const index = LocalStorageCRUD.read(`${this.modelName}-index`);

    const search = {
      id: index + 1,
      userId,
      userName,
      category,
      departingDate,
      returningDate,
      stops,
      difficulty,
      min,
      max,
      continent,
      numberOfPeople,
      departure,
      createdAt: new Date().toISOString(),
      deleted: false
    };

    searches.push(search);
    LocalStorageCRUD.update(this.modelName, searches);
    LocalStorageCRUD.update(`${this.modelName}-index`, index + 1);

    return search;
  }
}

export default new SearchModel();