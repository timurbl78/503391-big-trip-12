import FiltersView from "./view/filters"
import MainMenuView from "./view/main-menu"
import TotalCostView from "./view/total-cost";
import TripMainInfoView from "./view/trip-main-info";
import SortMenuView from "./view/sort-menu";
import TripEventsListView from "./view/trip-events-list";
import TripPointEditView from "./view/trip-point-edit";
import TripPointView from "./view/trip-point";
import {generateTripPoint} from "./mock/trip-point";
import {render, RenderPosition} from "./utils";

const EVENTS_COUNT = 20;

const renderTripPoint = (tripPointListElement, tripPoint) => {
  const tripPointComponent = new TripPointView(tripPoint);
  const tripPointEditComponent = new TripPointEditView(tripPoint);

  const replaceCardToForm = () => {
    tripPointListElement.replaceChild(tripPointEditComponent.getElement(), tripPointComponent.getElement());
  };

  const replaceFormToCard = () => {
    tripPointListElement.replaceChild(tripPointComponent.getElement(), tripPointEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  tripPointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  tripPointEditComponent.getElement().querySelector(`.event`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tripPointListElement, tripPointComponent.getElement(), RenderPosition.BEFOREEND);
};

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
render(siteTripEventsElement, new SortMenuView().getElement(), `beforeend`);
render(siteTripEventsElement, new TripEventsListView().getElement(), `beforeend`);

const siteTripEventsListElement = siteTripEventsElement.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENTS_COUNT; i++) {
  renderTripPoint(siteTripEventsListElement, tripPoints[i]);
}
