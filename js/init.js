import LocalStorageCRUD from '/js/utilities/crud.js';
import { populate } from '/js/utilities/populate.js'

const checkStorage = (key) => {
  const exists = LocalStorageCRUD.hasKey(key);
  if (!exists) {
    // create the data array
    LocalStorageCRUD.create(key, []);
    // create an index with the id of the user
    LocalStorageCRUD.create(`${key}-index`, 0);
  }
};

const areAllStorageEmpty = () => {
  const storageKeys = ['users', 'packs', 'categories', 'flights', 'search', 'contacts', 'reservations'];

  for (const key of storageKeys) {
    const data = LocalStorageCRUD.read(key);
    if (data && data.length > 0) {
      return false; // Found non-empty storage
    }
  }
  return true; // All storage items are empty
};

checkStorage('users');
checkStorage('packs');
checkStorage('categories');
checkStorage('flights');
checkStorage('search');
checkStorage('contacts');
checkStorage('reservations');

// Only populate if all storage items are empty
if (areAllStorageEmpty()) {
  populate();
}