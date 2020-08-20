import SortMenuView from "../view/sort-menu";
import TripEventsListView from "../view/trip-events-list";
import TripPointEditView from "../view/trip-point-edit";
import TripPointView from "../view/trip-point";
import NoPointsView from "../view/no-points";
import {render, RenderPosition, replace} from "../utils/render.js";

const TASK_COUNT_PER_STEP = 8;

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;

    this._noTripPoints = new NoPointsView();
    this._sortMenu = new SortMenuView();
    this._tripEventsList = new TripEventsListView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();

    if (this._tripPoints.length === 0) {
      this._renderNoTripPoints();
    } else {
      this._renderSortMenu();
      this._renderTripEventsList();

      this._renderTripPoints();
    }
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
    const tripPointComponent = new TripPointView(tripPoint);
    const tripPointEditComponent = new TripPointEditView(tripPoint);

    const replaceCardToForm = () => {
      replace(tripPointEditComponent, tripPointComponent);
    };

    const replaceFormToCard = () => {
      replace(tripPointComponent, tripPointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    tripPointComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    tripPointEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(siteTripEventsListElement, tripPointComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderTripPoints() {
    const siteTripEventsListElement = this._tripContainer.querySelector(`.trip-events__list`);

    for (let i = 0; i < this._renderedTaskCount; i++) {
      this._renderTripPoint(siteTripEventsListElement, this._tripPoints[i]);
    }
  }
}
