import LocalStorageCRUD from '/js/utilities/crud.js';

const checkStorage = (key) => {
  const exists = LocalStorageCRUD.hasKey(key);
  if (!exists) {
    // create the data array
    LocalStorageCRUD.create(key, []);
    // create an index with the id of the user
    LocalStorageCRUD.create(`${key}-index`, 0);
  }
};

checkStorage('users');
checkStorage('packs');
checkStorage('categories');
checkStorage('flights');
checkStorage('search');
