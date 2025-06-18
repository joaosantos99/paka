import SearchModel from '/js/models/SearchModel.js';
import PackModel from '/js/models/PackModel.js';
import FlightsModel from '/js/models/FlightsModel.js';
import ReservationModel from '/js/models/ReservationModel.js';
import LocalStorageCRUD from '/js/utilities/crud.js';
import UserModel from '/js/models/UserModel.js';

class SearchHandler {
  constructor() {
    this.searchModel = SearchModel;
    this.packModel = PackModel;
    this.flightsModel = FlightsModel;
    this.reservationModel = ReservationModel;
  }

  getQueryParams() {
    const search = window.location.search;
    if (!search) return null;

    const searchParams = new URLSearchParams(search);
    return Object.fromEntries(searchParams);
  }

  search() {
    const {
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
    } = this.getQueryParams() || {};

    const userId = LocalStorageCRUD.read('user');
    const userName = UserModel.getByPk(userId).name;

    this.searchModel.create({
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
    });

    let packs = [];

    if (category) {
      packs = this.packModel.getByCategory(category);
    } else {
      packs = this.packModel.getAll();
    }

    if (departure) {
      const flights = this.flightsModel.getAll();
      packs = packs.filter(pack => {
        // Get the first stop of the pack
        const firstStop = pack.stops[0];
        if (!firstStop) return false;

        // Check if there's a flight from departure to the first stop
        return flights.some(flight =>
          flight.departure === departure &&
          flight.arrival === firstStop &&
          (!departingDate || new Date(flight.departureDate) >= new Date(departingDate))
        );
      });
    }

    if (departingDate) {
      packs = packs.filter(pack => new Date(pack.startDate) >= new Date(departingDate));
    }

    if (returningDate) {
      packs = packs.filter(pack => new Date(pack.endDate) <= new Date(returningDate));
    }

    if (stops) {
      console.log(stops);
      packs = packs.filter(pack => pack.stops.length === parseInt(stops));
    }

    if (['easy', 'medium', 'hard'].includes(difficulty)) {
      packs = packs.filter(pack => pack.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    if (min) {
      packs = packs.filter(pack => pack.price >= parseInt(min));
    }

    if (max) {
      packs = packs.filter(pack => pack.price <= parseInt(max));
    }

    if (['Europe', 'Asia', 'North America', 'South America', 'Africa', 'Oceania', 'Antarctica'].includes(continent)) {
      packs = packs.filter(pack => pack.continent.toLowerCase() === continent.toLowerCase());
    }

    if (numberOfPeople) {
      packs = packs.filter(pack => {
        const reservations = this.reservationModel.getByPackId(pack.id);
        const totalNumberOfPeople = reservations.reduce((acc, reservation) => acc + reservation.numberOfPeople, 0);
        return totalNumberOfPeople + parseInt(numberOfPeople) <= pack.slots;
      });
    }

    console.log(packs);
    return packs;
  }
}

export default new SearchHandler();