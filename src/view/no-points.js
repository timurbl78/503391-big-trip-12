import AbstractView from "./abstract";

export default class NoPoints extends AbstractView {
  _createNoPointsTemplate() {
    return (`<p class="trip-events__msg">Click New Event to create your first point</p>`);
  }

  _getTemplate() {
    return this._createNoPointsTemplate();
  }
}
