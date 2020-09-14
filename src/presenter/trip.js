import SortMenuView from "../view/sort-menu";
import DayView from "../view/day";
import TripDaysListView from "../view/trip-days-list";
import TripEventsListView from "../view/trip-events-list";
import PointListElement from "../view/point-list-element";
import NoPointsView from "../view/no-points";
import LoadingView from "../view/loading";
import TripPointPresenter from "./trip-point";
import PointNewPresenter from "./point-new";
import {SortType, UpdateType, UserAction, FilterType} from "../const";
import {filter} from "../utils/filter.js";
import {sortByEvent, sortByPrice, sortByDate} from "../utils/point";
import {render, RenderPosition, remove} from "../utils/render.js";

export default class Trip {
  constructor(tripContainer, siteTripMainElement, pointsModel, filterModel, destinationsModel, offersModel) {
    this._tripContainer = tripContainer;
    this._siteTripMainElement = siteTripMainElement;

    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._tripPointPresenter = {};
    this._currentSortType = null;
    this._isLoading = true;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._noTripPointsComponent = new NoPointsView();
    this._loadingComponent = new LoadingView();
    this._sortMenuComponent = null;
    this._tripDaysList = new TripDaysListView();

    this._pointNewPresenter = new PointNewPresenter(this._tripContainer, this._handleViewAction, this._siteTripMainElement);
  }

  init() {
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._destinationsModel.addObserver(this._handleModelEvent);
    this._offersModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  destroy() {
    this._clearBoard({resetSortType: true});

    remove(this._tripDaysList);
    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
    this._destinationsModel.removeObserver(this._handleModelEvent);
    this._offersModel.removeObserver(this._handleModelEvent);
  }

  _getTasks() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByDate);
      case SortType.EVENT:
        return filteredPoints.sort(sortByEvent);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }

    return filteredPoints;
  }

  _getDestinations() {
    return this._destinationsModel.getDestinations();
  }

  _getOffers() {
    return this._offersModel.getOffers();
  }

  createPoint() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init();
  }

  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

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

  _clearBoard({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();

    Object
      .values(this._tripPointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._tripPointPresenter = {};

    remove(this._sortMenuComponent);
    remove(this._noTripPointsComponent);
    remove(this._loadingComponent);
    remove(this._tripDaysList);

    if (resetSortType) {
      this._currentSortType = SortType.EVENT;
    }
  }

  _renderNoTripPoints() {
    render(this._tripContainer, this._noTripPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(this._tripContainer, this._loadingComponent, RenderPosition.AFTERBEGIN);
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
    const destinations = this._getDestinations().slice();
    const offers = this._getOffers().slice();

    const tripPointPresenter = new TripPointPresenter(siteTripEventsListElement, destinations, offers, this._handleViewAction, this._handleModeChange);
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
    });
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
      });
    } else {
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
        if (i < tripPoints.length) {
          sameDayPoints = [tripPoints[i]];
        }
      }
      if (sameDayPoints.length !== 0) {
        this._renderDay(numberOfDates, sameDayPoints);
      }
    }
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

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();

    Object
      .values(this._tripPointPresenter)
      .forEach((presenter) => presenter.resetView());
  }
}
