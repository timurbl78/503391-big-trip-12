import SmartView from "./smart";
import {TOWNS_PHOTOS, TOWNS_DESCRIPTION} from "../mock/trip-point";
import {TRIP_POINTS_MAP, TRIP_POINT_ACTIVITIES_TYPE, TRIP_POINT_TRANSFER_TYPES} from "../const";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";
import {OFFERS_TYPE} from "../mock/additional-option";

const createDestinationBlock = (tripPoint) => {
  return (
    `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${tripPoint.description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${tripPoint.photos}
      </div>
    </div>
  </section>`);
};

const createEventActivityBlock = (tripPoint) => {
  let block = ``;

  for (let i = 0; i < TRIP_POINT_ACTIVITIES_TYPE.length; i++) {
    let type = TRIP_POINT_ACTIVITIES_TYPE[i];
    block +=
      `<div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${tripPoint.tripPointType === type ? `checked` : ``}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase() + type.slice(1)}</label>
      </div>`
  }

  return block;
}

const createEventTransferBlock = (tripPoint) => {
  let block = ``;
  for (let i = 0; i < TRIP_POINT_TRANSFER_TYPES.length; i++) {
    let type = TRIP_POINT_TRANSFER_TYPES[i];
    block +=
      `<div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${tripPoint.tripPointType === type ? `checked` : ``}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase() + type.slice(1)}</label>
      </div>`
  }
  return block;
}

const createAdditionalOptionsBLock = (tripPoint) => {
  const additionalOptions = generateAdditionalOptions(tripPoint);

  if (additionalOptions !== ``) {
    return (`
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${additionalOptions}
    </div>
  </section>`);
  }

  return ``;
};

const generateAdditionalOptions = (tripPoint) => {
  let options = ``;
  if (tripPoint.additionalOptions !== null) {
    for (let i = 0; i < tripPoint.additionalOptions.length; i++) {
      const option = tripPoint.additionalOptions[i];
      options = options + `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">
      <label class="event__offer-label" for="event-offer-luggage-1">
        <span class="event__offer-title">${option.name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${option.cost}</span>
      </label>
    </div>`;
    }
  }

  return options;
};

const createEventDetailsBlock = (additionalOptionsBlock, destinationInfoBlock) => {
  return (
    `<section class="event__details">
      ${additionalOptionsBlock}
      ${destinationInfoBlock}
    </section>`);
};

export default class TripPointEdit extends SmartView {
  constructor(data) {
    super();
    this._data = data;
    this._datepickerStartDate = null;
    this._datepickerEndDate = null;

    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._defaultClickHandler = this._defaultClickHandler.bind(this);
    this._costInputHandler = this._costInputHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._typeNameRadioHandler = this._typeNameRadioHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepickerStartDate();
    this._setDatepickerEndDate();
  }

  // TODO: by className
  _setDatepickerStartDate() {
    if (this._datepickerStartDate) {
      this._datepickerStartDate.destroy();
      this._datepickerStartDate = null;
    }

    if (this._data.startDate) {
      this._datepickerStartDate = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/y H:i`,
          defaultDate: this._data.startDate,
          onChange: this._startDateChangeHandler
        }
      );
    }
  }

  _setDatepickerEndDate() {
    if (this._datepickerEndDate) {
      this._datepickerEndDate.destroy();
      this._datepickerEndDate = null;
    }

    if (this._data.endDate) {
      this._datepickerEndDate = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          enableTime: true,
          dateFormat: `d/m/Y H:i`,
          defaultDate: this._data.endDate,
          onChange: this._endDateChangeHandler
        }
      );
    }
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      isFavorite: !this._data.isFavorite
    })
  }

  _costInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      cost: evt.target.value
    }, true);
  }

  _destinationInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      destination: evt.target.value,
      photos: TOWNS_PHOTOS.get(evt.target.value),
      description: TOWNS_DESCRIPTION.get(evt.target.value)
    }, true);

    if (TOWNS_DESCRIPTION.has(evt.target.value)) {
      this.updateData({
        photos: TOWNS_PHOTOS.get(evt.target.value),
        description: TOWNS_DESCRIPTION.get(evt.target.value)
      })
    }
  }

  _typeNameRadioHandler(evt) {
    this.updateData({
      tripPointType: evt.target.value,
      additionalOptions: OFFERS_TYPE.get(evt.target.value)
    })
  }

  _startDateChangeHandler([userDate]) {
    this.updateData({
      startDate: userDate
    });
  }

  _endDateChangeHandler([userDate]) {
    this.updateData({
      endDate: userDate
    });
  }

  _defaultClickHandler(evt) {
    evt.preventDefault();
    this._callback.defaultClick();
  }

  setDefaultClickHandler(callback) {
    this._callback.defaultClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._defaultClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, this._favoriteClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`.event`).addEventListener(`submit`, this._formSubmitHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepickerStartDate();
    this._setDatepickerEndDate();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  reset(tripPoint) {
    this.updateData(
      tripPoint
    );
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__favorite-checkbox`)
      .addEventListener(`click`, this._favoriteClickHandler)
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._costInputHandler);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`input`, this._destinationInputHandler);
    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._defaultClickHandler);
    const radios = this
      .getElement()
      .querySelectorAll(`input[name="event-type"]`)
    for (let i = 0; i < radios.length; i++) {
      radios[i].addEventListener(`click`, this._typeNameRadioHandler);
    }
  }

  _createTripPointEditTemplate(tripPoint) {
    let startDay = `01`;
    let startHours = `00`;
    let startMinutes = `00`;
    let startMonth = `01`;
    let startYear = `01`;
    let endDay = `01`;
    let endHours = `00`;
    let endMinutes = `00`;
    let endMonth = `01`;
    let endYear = `01`;

    if (tripPoint.startDate !== null) {
      startMinutes = tripPoint.startDate.getMinutes();
      startHours = tripPoint.startDate.getHours();
      startDay = tripPoint.startDate.getDay();
      startMonth = tripPoint.startDate.getMonth();
      startYear = tripPoint.startDate.getFullYear() % 100;
    }

    if (tripPoint.endDate !== null) {
      endMinutes = tripPoint.endDate.getMinutes();
      endHours = tripPoint.endDate.getHours();
      endDay = tripPoint.endDate.getDay();
      endMonth = tripPoint.endDate.getMonth();
      endYear = tripPoint.endDate.getFullYear() % 100;
    }

    const eventTransferBlock = createEventTransferBlock(tripPoint);
    const eventActivityBlock = createEventActivityBlock(tripPoint);

    const additionalOptionsBlock = createAdditionalOptionsBLock(tripPoint);

    let destinationInfoBlock = ``;
    if (TOWNS_DESCRIPTION.get(tripPoint.destination) !== undefined) {
      destinationInfoBlock = createDestinationBlock(tripPoint);
    }

    let eventDetailsBlock = ``;
    if (destinationInfoBlock !== undefined || additionalOptionsBlock !== undefined) {
      eventDetailsBlock = createEventDetailsBlock(additionalOptionsBlock, destinationInfoBlock);
    }

    return (
      `<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" src="img/icons/${tripPoint.tripPointType.toLowerCase()}.png" alt="Event type icon" width="17" height="17">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${eventTransferBlock}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                ${eventActivityBlock}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${tripPoint.tripPointType[0].toUpperCase() + tripPoint.tripPointType.slice(1)} ${TRIP_POINTS_MAP.get(tripPoint.tripPointType)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${tripPoint.destination}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Berlin"></option>
              <option value="Colombo"></option>
              <option value="Novosibirsk"></option>
              <option value="Moscow"></option>
              <option value="Kazan"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDay}/${startMonth}/${startYear} ${startHours}:${startMinutes}">
            —
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDay}/${endMonth}/${endYear} ${endHours}:${endMinutes}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${tripPoint.cost ? tripPoint.cost : 0}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${tripPoint.isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        ${eventDetailsBlock}
      </form>
    </li>`
    );
  }

  _getTemplate() {
    return this._createTripPointEditTemplate(this._data);
  }
}
