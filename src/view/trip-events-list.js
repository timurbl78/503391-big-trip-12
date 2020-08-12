import {createElement} from "../utils";

export default class TripEventsList {
  constructor() {
    this._element = null;
  }

  _createTripEventsList() {
    return (
      `<ul class="trip-events__list"></ul>`
    );
  };

  _getTemplate() {
    return this._createTripEventsList();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
