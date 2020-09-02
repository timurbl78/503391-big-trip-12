import AbstractView from "./abstract";

export default class PointListElement extends AbstractView {
  _createPointListElement() {
    return (`<li class="trip-events__item"></li>`);
  }

  _getTemplate() {
    return this._createPointListElement();
  }
}
