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
      for (let j = 0; j < tripPoints[i].additionalOptions.length; j++) {
        if (tripPoints[i].additionalOptions[j].isChecked) {
          totalCost += tripPoints[i].additionalOptions[j].cost;
        }
      }
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
