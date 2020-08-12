import {createElement} from "../utils";

export default class TripMainInfo {
  constructor() {
    this._element = null;
  }

  _createTripMainInfoTemplate() {
    return (
      `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>
    </section>`
    );
  };

  _getTemplate() {
    return this._createTripMainInfoTemplate();
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
