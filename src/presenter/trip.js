import SortMenuView from "../view/sort-menu";
import DayView from "../view/day";
import TripDaysListView from "../view/trip-days-list";
import TripEventsListView from "../view/trip-events-list";
import PointListElement from "../view/point-list-element";
import TripPointPresenter from "./tripPoint";
import NoPointsView from "../view/no-points";
import {SortType, UpdateType, UserAction} from "../const";
import {sortByEvent, sortByPrice, sortByDate} from "../utils/point";
import {render, RenderPosition, remove} from "../utils/render.js";

export default class Trip {
  constructor(tripContainer, pointsModel) {
    this._tripContainer = tripContainer;
    this._pointsModel = pointsModel;
    this._tripPointPresenter = {};
    this._currentSortType = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._noTripPointsComponent = new NoPointsView();
    this._sortMenuComponent = null;
    this._tripDaysList = new TripDaysListView();

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderBoard();
  }

  _clearBoard({resetSortType = false} = {}) {
    Object
      .values(this._tripPointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._tripPointPresenter = {};

    remove(this._sortMenuComponent);
    remove(this._noTripPointsComponent);
    remove(this._tripDaysList);

    if (resetSortType) {
      this._currentSortType = SortType.EVENT;
    }
  }

  _renderBoard() {
    const tripPoints = this._getTasks();

    if (this._currentSortType === null) {
      this._currentSortType = SortType.EVENT;
    }

    if (tripPoints.length === 0) {
      this._renderNoTripPoints();
    } else {
      this._sortMenuComponent = new SortMenuView(this._currentSortType);
      this._renderSortMenu();
      this._renderTripDaysList();

      this._renderTripPoints();
    }
  }

  _getTasks() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._pointsModel.getPoints().slice().sort(sortByDate);
      case SortType.EVENT:
        return this._pointsModel.getPoints().slice().sort(sortByEvent);
      case SortType.PRICE:
        return this._pointsModel.getPoints().slice().sort(sortByPrice);
    }

    return this._pointsModel.getPoints();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._tripPointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _handleModeChange() {
    Object
      .values(this._tripPointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderNoTripPoints() {
    render(this._tripContainer, this._noTripPointsComponent, RenderPosition.BEFOREEND);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _renderSortMenu() {
    if (this._sortMenuComponent !== null) {
      this._sortMenuComponent = null;
    }

    this._sortMenuComponent = new SortMenuView(this._currentSortType);
    this._sortMenuComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripContainer, this._sortMenuComponent, RenderPosition.BEFOREEND);
  }

  _renderTripDaysList() {
    render(this._tripContainer, this._tripDaysList, RenderPosition.BEFOREEND);
  }

  _renderTripPoint(siteTripEventsListElement, tripPoint) {
    const tripPointPresenter = new TripPointPresenter(siteTripEventsListElement, this._handleViewAction, this._handleModeChange);
    tripPointPresenter.init(tripPoint);
    this._tripPointPresenter[tripPoint.id] = tripPointPresenter;
  }

  _renderDay(numberOfDates, points) {
    let day = new DayView(true, numberOfDates, points[0].startDate);
    let tripEventsList = new TripEventsListView();
    render(this._tripDaysList, day, RenderPosition.BEFOREEND);
    render(day, tripEventsList, RenderPosition.BEFOREEND);
    points.forEach((tripPoint) => {
      let pointListElement = new PointListElement();
      render(tripEventsList, pointListElement, RenderPosition.BEFOREEND);
      this._renderTripPoint(pointListElement, tripPoint);
    })
  }

  _renderTripPoints() {
    const tripPoints = this._getTasks().slice();

    if (this._currentSortType !== SortType.EVENT) {
      const day = new DayView(false);
      const tripEventsList = new TripEventsListView();

      render(this._tripDaysList, day, RenderPosition.BEFOREEND);
      render(day, tripEventsList, RenderPosition.BEFOREEND);

      tripPoints.forEach((tripPoint) => {
        let pointListElement = new PointListElement();
        render(tripEventsList, pointListElement, RenderPosition.BEFOREEND);
        this._renderTripPoint(pointListElement, tripPoint);
      })
    }
    else {
      let sameDayPoints = [tripPoints[0]];
      let numberOfDates = 1;
      for (let i = 1; i < tripPoints.length; i++) {
        while (i < tripPoints.length && sameDayPoints[0].startDate.toLocaleDateString() === tripPoints[i].startDate.toLocaleDateString()) {
          sameDayPoints.push(tripPoints[i]);
          i++;
        }
        this._renderDay(numberOfDates, sameDayPoints);

        numberOfDates++;
        sameDayPoints = [];
        if (i < tripPoints.length)
          sameDayPoints = [tripPoints[i]];
      }
      if (sameDayPoints.length !== 0) {
        this._renderDay(numberOfDates, sameDayPoints);
      }
    }
  }
}
