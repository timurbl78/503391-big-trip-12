import {createElement} from "../utils";

export default class MainMenu {
  constructor() {
    this._element = null;
  }

  _createMainMenuTemplate() {
    return (
      `<nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
        <a class="trip-tabs__btn" href="#">Stats</a>
      </nav>`
    );
  };

  _getTemplate() {
    return this._createMainMenuTemplate();
  }

  getHeading() {
    return createElement(`<h2 class="visually-hidden">Switch trip view</h2>`);
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
