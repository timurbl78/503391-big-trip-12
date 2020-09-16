import AbstractView from "./abstract";

export default class TripEventsList extends AbstractView {
  _getTemplate() {
    return this._createTripEventsList();
  }

  _createTripEventsList() {
    return (
      `<ul class="trip-events__list"></ul>`
    );
  }
}
