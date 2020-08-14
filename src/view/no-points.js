import {createElement} from "../utils";

export default class NoPoints {
  constructor() {
    this._element = null;
  }

  _createNoPointsTemplate() {
    return (`<p class="trip-events__msg">Click New Event to create your first point</p>`);
  }

  _getTemplate() {
    return this._createNoPointsTemplate();
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
