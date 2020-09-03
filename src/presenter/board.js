import MainMenuView from "../view/main-menu";

import {render} from "../utils/render";
import {RenderPosition} from "../utils/render";
import PointsModel from "../model/points";
import FilterModel from "../model/filter";
import TripPresenter from "./trip";
import FilterPresenter from "./filter";

export default class Board {
  constructor(tripPoints) {
    this._tripPoints = tripPoints;
  }

  init() {
    this._renderBoard();
  }

  _renderBoard() {
    this._siteTripMainElement = document.querySelector(`.trip-main`);

    this._mainMenuElement = new MainMenuView();
    this._siteTripControlsElement = this._siteTripMainElement.querySelector(`.trip-controls`);
    render(this._siteTripControlsElement, this._mainMenuElement.getElement(), RenderPosition.AFTERBEGIN);
    render(this._siteTripControlsElement, this._mainMenuElement.getHeading(), RenderPosition.AFTERBEGIN);

    this._pointsModel = new PointsModel();
    this._pointsModel.setPoints(this._tripPoints);

    this._filterModel = new FilterModel();

    this._sitePageMainElement = document.querySelector(`.page-main`);
    this._siteTripEventsElement = this._sitePageMainElement.querySelector(`.trip-events`);

    this._tripPresenter = new TripPresenter(this._siteTripEventsElement, this._siteTripMainElement, this._pointsModel, this._filterModel);
    this._filterPresenter = new FilterPresenter(this._siteTripControlsElement, this._filterModel, this._pointsModel);

    this._filterPresenter.init();
    this._tripPresenter.init();

    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._tripPresenter.createPoint();
    });
  }
}
