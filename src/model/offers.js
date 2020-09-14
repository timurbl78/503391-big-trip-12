import ObserverView from "../utils/observer";

export default class Offers extends ObserverView {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(updateType, offers) {
    this._offers = offers.slice();

    this._notify(updateType);
  }

  getOffers() {
    return this._offers;
  }
}
