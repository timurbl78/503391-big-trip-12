import AbstractView from "./abstract";
import {SortType, TagName} from "../const";

export default class SortMenu extends AbstractView {
  constructor(currentSortType) {
    super();

    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  _getTemplate() {
    return this._createSortMenuTemplate();
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }

  _createSortMenuTemplate() {
    return (
      `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${this._currentSortType === SortType.EVENT ?
        `<span class="trip-sort__item  trip-sort__item--day">Day</span>`
        : `<span class="trip-sort__item  trip-sort__item--day"></span>`}

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" ${this._currentSortType === SortType.EVENT ? `checked` : ``} type="radio" name="trip-sort" value="sort-event" data-sort-type="${SortType.EVENT}">
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" ${this._currentSortType === SortType.TIME ? `checked` : ``} type="radio" name="trip-sort" value="sort-time" data-sort-type="${SortType.TIME}">
        <label class="trip-sort__btn  trip-sort__btn--active  trip-sort__btn--by-increase" for="sort-time">
          Time
        </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" ${this._currentSortType === SortType.PRICE ? `checked` : ``} type="radio" name="trip-sort" value="sort-price" data-sort-type="${SortType.PRICE}">
        <label class="trip-sort__btn" for="sort-price">
          Price
        </label>
      </div>

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
    );
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== TagName.INPUT) {
      return;
    }

    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}
