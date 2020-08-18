import AbstractView from "./abstract";
import {createElement} from "../utils/render";

export default class MainMenu extends AbstractView {
  _createMainMenuTemplate() {
    return (
      `<nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
        <a class="trip-tabs__btn" href="#">Stats</a>
      </nav>`
    );
  }

  _getTemplate() {
    return this._createMainMenuTemplate();
  }

  getHeading() {
    return createElement(`<h2 class="visually-hidden">Switch trip view</h2>`);
  }
}
