import LocalStorageCRUD from '/js/utilities/crud.js';
import BaseModel from '/js/models/BaseModel.js';

class FlightsModel extends BaseModel {
  constructor() {
    super();
    this.modelName = 'flights';
  }

  create({
    departure,
    departureDate,
    departureTime,
    arrival,
    arrivalDate,
    arrivalTime,
    price,
  }) {
    const flights = LocalStorageCRUD.read(this.modelName);
    const index = LocalStorageCRUD.read(`${this.modelName}-index`);

    const flight = {
      id: index + 1,
      departure,
      departureDate,
      departureTime,
      arrival,
      arrivalDate,
      arrivalTime,
      price,
      deleted: false,
    }

    flights.push(flight);
    LocalStorageCRUD.update(this.modelName, flights);
    LocalStorageCRUD.update(`${this.modelName}-index`, index + 1);

    return flight;
  }

  getByDepartureAndDate(departure, date) {
    const flights = LocalStorageCRUD.read(this.modelName);
    return flights.filter(flight => flight.departure === departure && flight.departureDate === date);
  }
}

export default new FlightsModel();