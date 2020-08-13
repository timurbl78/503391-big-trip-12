import {createElement} from "../utils";

export default class TotalCost {
  constructor(tripPoints) {
    this._element = null;
    this._tripPoints = tripPoints;
  }

  _createTotalCostTemplate(tripPoints) {
    let totalCost = 0;

    for (let i = 0; i < tripPoints.length; i++) {
      totalCost += tripPoints[i].cost;
    }

    return (
      `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
    </p>`
    );
  }

  _getTemplate() {
    return this._createTotalCostTemplate(this._tripPoints);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
