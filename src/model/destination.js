import ObserverView from "../utils/observer";

export default class Destination extends ObserverView {
  constructor() {
    super();
    this._destinations = [];
  }

  setDestinations(updateType, destinations) {
    this._destinations = destinations.slice();

    this._notify(updateType);
  }

  getDestinations() {
    return this._destinations;
  }
}
