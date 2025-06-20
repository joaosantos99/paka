import LocalStorageCRUD from '/js/utilities/crud.js';
import BaseModel from '/js/models/BaseModel.js';

class ReservationModel extends BaseModel {
  constructor() {
    super();
    this.modelName = 'reservations';
  }

  create({
    userId,
    packId,
    departureFlightId,
    arrivalFlightId,
    numberOfPeople,
  }) {
    const reservations = LocalStorageCRUD.read(this.modelName);
    const index = LocalStorageCRUD.read(`${this.modelName}-index`);

    const reservation = {
      id: index + 1,
      userId,
      packId,
      departureFlightId,
      arrivalFlightId,
      numberOfPeople,
      deleted: false,
    }

    reservations.push(reservation);
    LocalStorageCRUD.update(this.modelName, reservations);
    LocalStorageCRUD.update(`${this.modelName}-index`, index + 1);

    return reservation;
  }

  getByUserId(userId) {
    const reservations = LocalStorageCRUD.read(this.modelName);
    return reservations.filter(reservation => reservation.userId === userId && !reservation.deleted);
  }

  getByPackId(packId) {
    const reservations = LocalStorageCRUD.read(this.modelName);
    return reservations.filter(reservation => reservation.packId === packId && !reservation.deleted);
  }
}

export default new ReservationModel();