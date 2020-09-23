import AbstractView from "./abstract";
import {sortByEvent} from "../utils/point";

import moment from "moment";

export default class TripMainInfo extends AbstractView {
  constructor(tripPoints) {
    super();

    this._tripPoints = tripPoints;
  }

  _getTemplate() {
    return this._createTripMainInfoTemplate(this._tripPoints);
  }

  _calculateTotalCost(tripPoints) {
    let totalCost = 0;

    if (tripPoints.length !== 0) {
      for (let i = 0; i < tripPoints.length; i++) {
        totalCost += tripPoints[i].cost;
        const offers = tripPoints[i].offers;
        for (let j = 0; j < offers.length; j++) {
          if (offers[j].isChecked) {
            totalCost += offers[j].price;
          }
        }
      }
    }

    return totalCost;
  }

  _generateTitle(tripPoints) {
    const sortedTripPoints = tripPoints.slice().sort(sortByEvent);

    let title = ``;

    if (sortedTripPoints.length < 4) {
      for (let i = 0; i < sortedTripPoints.length; i++) {
        if (i !== sortedTripPoints.length - 1) {
          title += sortedTripPoints[i].destination.destination + ` — `;
        }
      }
    } else {
      title += sortedTripPoints[0].destination.name + ` — ... — ` +
        sortedTripPoints[sortedTripPoints.length - 1].destination.name;
    }

    return title;
  }

  _generateDate(tripPoints) {
    const sortedTripPoints = tripPoints.slice().sort(sortByEvent);

    if (sortedTripPoints.length !== 0) {
      return moment(sortedTripPoints[0].startDate).format(`D MMM`) + ` — ` +
        moment(sortedTripPoints[sortedTripPoints.length - 1].endDate).format(`D MMM`);
    }

    return ``;
  }

  _createTripMainInfoTemplate(tripPoints) {
    const totalCost = this._calculateTotalCost(tripPoints);
    const title = this._generateTitle(tripPoints);
    const date = this._generateDate(tripPoints);

    return (
      `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${title}</h1>

          <p class="trip-info__dates">${date}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
      </p>
    </section>`
    );
  }
}
