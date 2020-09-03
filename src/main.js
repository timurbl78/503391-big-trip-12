import MainMenuView from "./view/main-menu";
import TotalCostView from "./view/total-cost";
import TripMainInfoView from "./view/trip-main-info";
import TripPresenter from "./presenter/trip";
import FilterPresenter from "./presenter/filter";
import PointsModel from "./model/points";
import FilterModel from "./model/filter.js";
import {generateTripPoint} from "./mock/trip-point";
import {render, RenderPosition} from "./utils/render";

const EVENTS_COUNT = 6;

const tripPoints = new Array(EVENTS_COUNT).fill().map(generateTripPoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(tripPoints);

const filterModel = new FilterModel();

const siteTripMainElement = document.querySelector(`.trip-main`);
render(siteTripMainElement, new TripMainInfoView().getElement(), RenderPosition.AFTERBEGIN);

const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);
render(siteTripInfoElement, new TotalCostView(tripPoints).getElement(), RenderPosition.BEFOREEND);

const mainMenuElement = new MainMenuView();
const siteTripControlsElement = siteTripMainElement.querySelector(`.trip-controls`);
render(siteTripControlsElement, mainMenuElement.getElement(), RenderPosition.AFTERBEGIN);
render(siteTripControlsElement, mainMenuElement.getHeading(), RenderPosition.AFTERBEGIN);

const sitePageMainElement = document.querySelector(`.page-main`);
const siteTripEventsElement = sitePageMainElement.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(siteTripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteTripControlsElement, filterModel, pointsModel);

filterPresenter.init();
tripPresenter.init();
