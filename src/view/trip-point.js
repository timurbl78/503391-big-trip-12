import AbstractView from "./abstract";
import {TRIP_POINTS_MAP} from "../const";
import moment from "moment";
import trip from "../presenter/trip";

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

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
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

    let dateDiff = tripPoint.endDate - tripPoint.startDate;
    const daysDiff = Math.floor(dateDiff / (24 * 60 * 60 * 1000));
    dateDiff -= daysDiff * (24 * 60 * 60 * 1000);
    const hoursDiff = Math.floor(dateDiff / (1000 * 60 * 60));
    dateDiff -= hoursDiff * (60 * 60 * 1000);
    const minutesDiff = Math.floor(dateDiff / (60 * 1000));

    let dateDiffString = ``;
    if (daysDiff) {
      if (daysDiff < 10) {
        dateDiffString += `0` + daysDiff + `D `;
      } else {
        dateDiffString += daysDiff + `D `;
      }
    }
    if (hoursDiff) {
      if (hoursDiff < 10) {
        dateDiffString += `0` + hoursDiff + `H `;
      } else {
        dateDiffString += hoursDiff + `H `;
      }
    }
    if (minutesDiff < 10) {
      dateDiffString += `0` + minutesDiff + `M`;
    } else {
      dateDiffString += minutesDiff + `M`;
    }

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

  _getTemplate() {
    return this._createTripPointTemplate(this._tripPoint);
  }
}

