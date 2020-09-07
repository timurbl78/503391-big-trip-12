import AbstractView from "./abstract";

export default class PointListElement extends AbstractView {
  _getTemplate() {
    return this._createPointListElement();
  }

  _createPointListElement() {
    return (`<li class="trip-events__item"></li>`);
  }
}
