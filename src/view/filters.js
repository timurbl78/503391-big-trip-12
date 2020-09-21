import AbstractView from "./abstract";
import {createElement} from "../utils/render";
import {FilterType} from "../const";
import {filter as filterFunction} from "../utils/filter";

export default class Filters extends AbstractView {
  constructor(filterItems, currentFilterType, points) {
    super();
    this._filterItems = filterItems;
    this._currentFilterType = currentFilterType;
    this._points = points;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getHeading() {
    return createElement(`<h2 class="visually-hidden">Filter events</h2>`);
  }

  _getTemplate() {
    return this._createFiltersTemplate();
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }

  _createFilterItemTemplate(filter) {
    const {type, name} = filter;

    if (type === FilterType.EVERYTHING) {
      return (
        `<div class="trip-filters__filter">
        <input id="filter-${type}" class="trip-filters__filter-input visually-hidden"
         type="radio" name="trip-filter"
         ${type === this._currentFilterType ? `checked` : ``}
         value="${type}">
        <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
      </div>`
      );
    } else {
      const points = filterFunction[filter.type](this._points);

      return (
        `<div class="trip-filters__filter">
        <input id="filter-${type}" class="trip-filters__filter-input visually-hidden"
         type="radio" name="trip-filter"
         ${type === this._currentFilterType ? `checked` : ``}
         value="${type}"
         ${points.length ? `` : `disabled`}>
        <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
      </div>`
      );
    }
  }

  _createFiltersTemplate() {
    const filterItemsTemplate = this._filterItems
      .map((filter) => this._createFilterItemTemplate(filter))
      .join(``);

    return `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }
}
