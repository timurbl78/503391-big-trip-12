import AbstractView from "./abstract";

export default class TripDaysList extends AbstractView {
  _getTemplate() {
    return this._createTripDaysList();
  }

  _createTripDaysList() {
    return (`<ul class="trip-days"></ul>`);
  }
}
