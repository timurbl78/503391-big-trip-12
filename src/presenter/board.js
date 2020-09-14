import MainMenuView from "../view/main-menu";
import PointsModel from "../model/points";
import DestinationsModel from "../model/destination";
import OffersModel from "../model/offers";
import FilterModel from "../model/filter";
import TripPresenter from "./trip";
import FilterPresenter from "./filter";
import StatisticsView from "../view/statistics";
import {render, remove} from "../utils/render";
import {MenuItem, UpdateType} from "../const";
import {RenderPosition} from "../utils/render";
import TripMainInfoPresenter from "./trip-main-info";

export default class Board {
  constructor(api) {
    this._api = api;
    this._currentMenuItem = MenuItem.TABLE;
    this._handleSiteMenuClick = this._handleSiteMenuClick.bind(this);
    this._statisticsComponent = null;
  }

  init() {
    this._pointsModel = new PointsModel();
    this._destinationsModel = new DestinationsModel();
    this._offersModel = new OffersModel();

    this._api.getPoints()
      .then((points) => {
        this._pointsModel.setPoints(UpdateType.INIT, points);
      })
      .catch(() => {
        this._pointsModel.setPoints(UpdateType.INIT, []);
      });

    this._api.getDestinations()
      .then((destinations) => {
        this._destinationsModel.setDestinations(UpdateType.MINOR, destinations);
      })
      .catch(() => {
        this._destinationsModel.setDestinations(UpdateType.MINOR, []);
      });

    this._api.getOffers()
      .then((offers) => {
        this._offersModel.setOffers(UpdateType.MINOR, offers);
      })
      .catch(() => {
        this._offersModel.setOffers(UpdateType.MINOR, []);
      });

    this._renderBoard();
  }

  _renderBoard() {
    this._siteTripMainElement = document.querySelector(`.trip-main`);

    this._mainMenuElement = new MainMenuView();
    this._siteTripControlsElement = this._siteTripMainElement.querySelector(`.trip-controls`);
    render(this._siteTripControlsElement, this._mainMenuElement.getElement(), RenderPosition.AFTERBEGIN);
    render(this._siteTripControlsElement, this._mainMenuElement.getHeading(), RenderPosition.AFTERBEGIN);

    this._tripMainInfoPresenter = new TripMainInfoPresenter(this._siteTripMainElement);
    this._tripMainInfoPresenter.init();

    this._mainMenuElement.setMainMenuClickHandler(this._handleSiteMenuClick);

    this._filterModel = new FilterModel();

    this._sitePageMainElement = document.querySelector(`.page-main`);
    this._siteTripEventsElement = this._sitePageMainElement.querySelector(`.trip-events`);

    this._tripPresenter = new TripPresenter(this._siteTripEventsElement, this._siteTripMainElement, this._pointsModel, this._filterModel, this._destinationsModel, this._offersModel);
    this._filterPresenter = new FilterPresenter(this._siteTripControlsElement, this._filterModel, this._pointsModel);

    this._filterPresenter.init();
    this._tripPresenter.init();

    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (this._currentMenuItem !== MenuItem.TABLE) {
        this._currentMenuItem = MenuItem.TABLE;
        this._tripPresenter.init();
        remove(this._statisticsComponent);

        this._mainMenuElement.getElement().querySelector(`[data-name=${MenuItem.STATS}]`).classList.remove(`trip-tabs__btn--active`);
        this._mainMenuElement.getElement().querySelector(`[data-name=${MenuItem.TABLE}]`).classList.add(`trip-tabs__btn--active`);
      }
      this._tripPresenter.createPoint();
      this._siteTripMainElement.querySelector(`.trip-main__event-add-btn`).disabled = true;
    });
  }

  _handleSiteMenuClick(menuItem) {
    switch (menuItem) {
      case MenuItem.TABLE:
        if (this._currentMenuItem !== MenuItem.TABLE) {
          this._currentMenuItem = MenuItem.TABLE;
          this._tripPresenter.init();
          remove(this._statisticsComponent);
        }
        break;
      case MenuItem.STATS:
        if (this._currentMenuItem !== MenuItem.STATS) {
          this._currentMenuItem = MenuItem.STATS;
          this._tripPresenter.destroy();
          this._statisticsComponent = new StatisticsView(this._pointsModel.getPoints());
          render(this._sitePageMainElement.querySelector(`.page-body__container`), this._statisticsComponent, RenderPosition.BEFOREEND);
        }
        break;
    }
  }
}
