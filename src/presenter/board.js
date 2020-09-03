import TotalCostView from "../view/total-cost";
import TripMainInfoView from "../view/trip-main-info";
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
    render(this._siteTripMainElement, new TripMainInfoView().getElement(), RenderPosition.AFTERBEGIN);

    this._siteTripInfoElement = this._siteTripMainElement.querySelector(`.trip-info`);
    render(this._siteTripInfoElement, new TotalCostView(this._tripPoints).getElement(), RenderPosition.BEFOREEND);

    this._mainMenuElement = new MainMenuView();
    this._siteTripControlsElement = this._siteTripMainElement.querySelector(`.trip-controls`);
    render(this._siteTripControlsElement, this._mainMenuElement.getElement(), RenderPosition.AFTERBEGIN);
    render(this._siteTripControlsElement, this._mainMenuElement.getHeading(), RenderPosition.AFTERBEGIN);

    this._pointsModel = new PointsModel();
    this._pointsModel.setPoints(this._tripPoints);

    const filterModel = new FilterModel();

    const sitePageMainElement = document.querySelector(`.page-main`);
    const siteTripEventsElement = sitePageMainElement.querySelector(`.trip-events`);

    const tripPresenter = new TripPresenter(siteTripEventsElement, this._pointsModel, filterModel);
    const filterPresenter = new FilterPresenter(this._siteTripControlsElement, filterModel, this._pointsModel);

    filterPresenter.init();
    tripPresenter.init();

    document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      tripPresenter.createPoint();
    });
  }
}
