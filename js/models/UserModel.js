import LocalStorageCRUD from '/js/utilities/crud.js';
import BaseModel from '/js/models/BaseModel.js';

class UserModel extends BaseModel {
  constructor() {
    super();
    this.modelName = 'users';
  }

  create({
    name,
    email,
    password,
    isAdmin = false,
  }) {
    const users = LocalStorageCRUD.read(this.modelName);
    const index = LocalStorageCRUD.read(`${this.modelName}-index`);

    if (users.find(user => user.email === email)) {
      return 'User already exists';
    }

    const user = {
      id: index + 1,
      name,
      email,
      password,
      favoritesCount: 0,
      isAdmin,
      lastAccess: null,
      deleted: false,
    }

    users.push(user);
    LocalStorageCRUD.update(this.modelName, users);
    LocalStorageCRUD.update(`${this.modelName}-index`, index + 1);

    return user;
  }
}

export default new UserModel();