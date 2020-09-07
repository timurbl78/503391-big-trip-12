import AbstractView from "./abstract";

export default class NoPoints extends AbstractView {
  _getTemplate() {
    return this._createNoPointsTemplate();
  }

  _createNoPointsTemplate() {
    return (`<p class="trip-events__msg">Click New Event to create your first point</p>`);
  }
}
