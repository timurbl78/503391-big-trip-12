import AbstractView from "./abstract";

export default class TotalCost extends AbstractView {
  constructor(tripPoints) {
    super();
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
}
