import AbstractView from "./abstract";
import {createElement} from "../utils/render";
import {MenuItem} from "../const";

export default class MainMenu extends AbstractView {
  constructor() {
    super();

    this._mainMenuClickHandler = this._mainMenuClickHandler.bind(this);
  }

  _getTemplate() {
    return this._createMainMenuTemplate();
  }

  getHeading() {
    return createElement(`<h2 class="visually-hidden">Switch trip view</h2>`);
  }

  setMainMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._mainMenuClickHandler);
  }

  _createMainMenuTemplate() {
    return (
      `<nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn  trip-tabs__btn--active" data-name="${MenuItem.TABLE}" href="#">Table</a>
        <a class="trip-tabs__btn" data-name="${MenuItem.STATS}" href="#">Stats</a>
      </nav>`
    );
  }

  _mainMenuClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName === `A`) {
      evt.target.classList.add(`trip-tabs__btn--active`);
      if (evt.target.dataset.name === MenuItem.TABLE) {
        this.getElement().querySelector(`[data-name=${MenuItem.STATS}]`).classList.remove(`trip-tabs__btn--active`);
      } else {
        this.getElement().querySelector(`[data-name=${MenuItem.TABLE}]`).classList.remove(`trip-tabs__btn--active`);
      }

      this._callback.menuClick(evt.target.dataset.name);
    }
  }
}
