import SortMenuView from "../view/sort-menu";
import TripEventsListView from "../view/trip-events-list";
import TripPointPresenter from "./tripPoint";
import NoPointsView from "../view/no-points";
import {updateItem} from "../utils/common";
import {render, RenderPosition} from "../utils/render.js";

const TASK_COUNT_PER_STEP = 8;

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
    this._tripPointPresenter = {};

    this._handleTripPointChange = this._handleTripPointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._noTripPoints = new NoPointsView();
    this._sortMenu = new SortMenuView();
    this._tripEventsList = new TripEventsListView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._sourcedTripPoints = tripPoints.slice();

    if (this._tripPoints.length === 0) {
      this._renderNoTripPoints();
    } else {
      this._renderSortMenu();
      this._renderTripEventsList();

      this._renderTripPoints();
    }
  }

  _handleTripPointChange(updatedTripPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedTripPoint);
    this._sourcedTripPoints = updateItem(this._sourcedTripPoints, updatedTripPoint);
    this._tripPointPresenter[updatedTripPoint.id].init(updatedTripPoint);
  }

  _handleModeChange() {
    Object
      .values(this._tripPointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderNoTripPoints() {
    render(this._tripContainer, this._noTripPoints, RenderPosition.BEFOREEND);
  }

  _renderSortMenu() {
    render(this._tripContainer, this._sortMenu, RenderPosition.BEFOREEND);
  }

  _renderTripEventsList() {
    render(this._tripContainer, this._tripEventsList, RenderPosition.BEFOREEND);
  }

  _renderTripPoint(siteTripEventsListElement, tripPoint) {
    const tripPointPresenter = new TripPointPresenter(siteTripEventsListElement, this._handleTripPointChange, this._handleModeChange);
    tripPointPresenter.init(tripPoint);
    this._tripPointPresenter[tripPoint.id] = tripPointPresenter;
  }

  _renderTripPoints() {
    const siteTripEventsListElement = this._tripContainer.querySelector(`.trip-events__list`);

    for (let i = 0; i < this._renderedTaskCount; i++) {
      this._renderTripPoint(siteTripEventsListElement, this._tripPoints[i]);
    }
  }
}
