import AbstractView from "./abstract";
import {TRIP_POINTS_MAP} from "../const";
import moment from "moment";
import {formatDatesDifference} from "../utils/point";

const MAX_ADDITIONAL_OPTIONS = 3;

const generateAdditionalOptions = (tripPoint) => {
  let additionalOptions = ``;
  let optionsAmount = 0;

  for (let i = 0; i < Math.min(tripPoint.additionalOptions.length); i++) {
    const option = tripPoint.additionalOptions[i];
    if (option.isChecked && optionsAmount < MAX_ADDITIONAL_OPTIONS) {
      optionsAmount++;
      additionalOptions = additionalOptions +
        `<li class="event__offer">
        <span class="event__offer-title">${option.name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${option.cost}</span>
     </li>`;
    }
  }

  return additionalOptions;
};

export default class TripPoint extends AbstractView {
  constructor(tripPoint) {
    super();
    this._tripPoint = tripPoint;

    this._editClickHandler = this._editClickHandler.bind(this);
  }

  _getTemplate() {
    return this._createTripPointTemplate(this._tripPoint);
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }

  _createTripPointTemplate(tripPoint) {
    const startMinutes = tripPoint.startDate.getMinutes();
    const startHours = tripPoint.startDate.getHours();

    const endMinutes = tripPoint.endDate.getMinutes();
    const endHours = tripPoint.endDate.getHours();

    const dateDiffString = formatDatesDifference(tripPoint.endDate - tripPoint.startDate);

    const additionalOptions = generateAdditionalOptions(tripPoint);
    return (
      `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${tripPoint.tripPointType.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${tripPoint.tripPointType[0].toUpperCase() + tripPoint.tripPointType.slice(1)} ${TRIP_POINTS_MAP.get(tripPoint.tripPointType)} ${tripPoint.destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time"
            datetime="${moment(tripPoint.startDate).format()}">
              ${startHours}:${startMinutes}</time>
            &mdash;
            <time class="event__end-time"
            datetime="${moment(tripPoint.endDate).format()}">
              ${endHours}:${endMinutes}</time>
          </p>
          <p class="event__duration">${dateDiffString}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${tripPoint.cost}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${additionalOptions}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
    );
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }
}

