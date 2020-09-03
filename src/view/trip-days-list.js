import AbstractView from "./abstract";

export default class TripDaysList extends AbstractView {
  _createTripDaysList() {
    return (`<ul class="trip-days"></ul>`);
  }

  _getTemplate() {
    return this._createTripDaysList();
  }
}
