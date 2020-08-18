import FiltersView from "./view/filters"
import MainMenuView from "./view/main-menu"
import TotalCostView from "./view/total-cost";
import TripMainInfoView from "./view/trip-main-info";
import TripPresenter from "./presenter/trip";
import {generateTripPoint} from "./mock/trip-point";
import {render, RenderPosition} from "./utils/render";

const EVENTS_COUNT = 20;

const tripPoints = new Array(EVENTS_COUNT).fill().map(generateTripPoint);

const siteTripMainElement = document.querySelector(`.trip-main`);
render(siteTripMainElement, new TripMainInfoView().getElement(), RenderPosition.AFTERBEGIN);

const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);
render(siteTripInfoElement, new TotalCostView(tripPoints).getElement(), RenderPosition.BEFOREEND);

const mainMenuElement = new MainMenuView();
const filtersElement = new FiltersView();
const siteTripControlsElement = siteTripMainElement.querySelector(`.trip-controls`);
render(siteTripControlsElement, mainMenuElement.getElement(), RenderPosition.AFTERBEGIN);
render(siteTripControlsElement, mainMenuElement.getHeading(), RenderPosition.AFTERBEGIN);
render(siteTripControlsElement, filtersElement.getHeading(), RenderPosition.BEFOREEND);
render(siteTripControlsElement, filtersElement.getElement(), RenderPosition.BEFOREEND);

const sitePageMainElement = document.querySelector(`.page-main`);
const siteTripEventsElement = sitePageMainElement.querySelector(`.trip-events`);

const tripPresenter = new TripPresenter(siteTripEventsElement);

tripPresenter.init(tripPoints);
