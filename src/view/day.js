import AbstractView from "./abstract";
import moment from "moment";

export default class Day extends AbstractView {
  constructor(isHaveInfo, numberOfDay = null, date = null) {
    super();
    this._isHaveInfo = isHaveInfo;
    this._numberOfDay = numberOfDay;
    this._date = date;
  }

  _createTripDaysList() {
    if (this._isHaveInfo) {
      return (
        `<li class="trip-days__item  day">
          <div class="day__info">
            <span class="day__counter">${this._numberOfDay}</span>
            <time class="day__date" datetime="${moment(this._date).format(`YYYY-MM-DD`)}">${moment(this._date).format(`MMM DD`)}</time>
          </div>
        </li>`
      );
    }

    return (
      `<li class="trip-days__item  day">
        <div class="day__info"></div>
      </li>`);
  }

  _getTemplate() {
    return this._createTripDaysList();
  }
}
