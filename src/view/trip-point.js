import {TRIP_POINTS_MAP} from "../const";


const generateAdditionalOptions = (tripPoint) => {
  let additionalOptions = ``;

  for (let i = 0; i < tripPoint.additionalOptions.length; i++) {
    const option = tripPoint.additionalOptions[i];
    additionalOptions = additionalOptions +
      `<li class="event__offer">
        <span class="event__offer-title">${option.name}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${option.cost}</span>
     </li>`;
  }

  return additionalOptions;
};

export const createTripPointTemplate = (tripPoint) => {
  const startMinutes = tripPoint.startDate.getMinutes();
  const startHours = tripPoint.startDate.getHours();
  const startDay = tripPoint.startDate.getDay();
  const startMonth = tripPoint.startDate.getMonth();
  const startYear = tripPoint.startDate.getFullYear();

  const endMinutes = tripPoint.endDate.getMinutes();
  const endHours = tripPoint.endDate.getHours();
  const endDay = tripPoint.endDate.getDay();
  const endMonth = tripPoint.endDate.getMonth();
  const endYear = tripPoint.endDate.getFullYear();

  const additionalOptions = generateAdditionalOptions(tripPoint);
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${tripPoint.tripPointType.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${tripPoint.tripPointType} ${TRIP_POINTS_MAP.get(tripPoint.tripPointType)} ${tripPoint.destination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time"
            datetime="${startYear}-${startMonth}-${startDay}T${startHours}:${startMinutes}">
              ${startHours}:${startMinutes}</time>
            &mdash;
            <time class="event__end-time"
            datetime="${endYear}-${endMonth}-${endDay}T${endHours}:${endMinutes}">
              ${endHours}:${endMinutes}</time>
          </p>
          <p class="event__duration">30M</p>
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
};
