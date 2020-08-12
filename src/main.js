import {createFiltersTemplate} from "./view/filters"
import {createMainMenuTemplate} from "./view/main-menu"
import {createTotalCostTemplate} from "./view/total-cost";
import {createTripMainInfoTemplate} from "./view/trip-main-info";
import {createSortMenuTemplate} from "./view/sort-menu";
import {createTripEventsList} from "./view/trip-events-list";
import {createTripPointEditTemplate} from "./view/trip-point-edit";
import {createTripPointTemplate} from "./view/trip-point";
import {generateTripPoint} from "./mock/trip-point";

const EVENTS_COUNT = 20;

const tripPoints = new Array(EVENTS_COUNT).fill().map(generateTripPoint);

const render = (container, code, place) => {
  container.insertAdjacentHTML(place, code);
};

const siteTripMainElement = document.querySelector(`.trip-main`);
render(siteTripMainElement, createTripMainInfoTemplate(), `afterbegin`);

const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);
render(siteTripInfoElement, createTotalCostTemplate(tripPoints), `beforeend`);

const siteTripControlsElement = siteTripMainElement.querySelector(`.trip-controls`);
render(siteTripControlsElement, createMainMenuTemplate(), `afterbegin`);
render(siteTripControlsElement, createFiltersTemplate(), `beforeend`);

const sitePageMainElement = document.querySelector(`.page-main`);
const siteTripEventsElement = sitePageMainElement.querySelector(`.trip-events`);
render(siteTripEventsElement, createSortMenuTemplate(), `beforeend`);
render(siteTripEventsElement, createTripEventsList(), `beforeend`);

const siteTripEventsListElement = siteTripEventsElement.querySelector(`.trip-events__list`);
render(siteTripEventsListElement, createTripPointEditTemplate(tripPoints[0]), `beforeend`);

for (let i = 1; i < EVENTS_COUNT; i++) {
  render(siteTripEventsListElement, createTripPointTemplate(tripPoints[i]), `beforeend`);
}
