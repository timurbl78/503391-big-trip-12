import AbstractView from "./abstract";

export default class TotalCost extends AbstractView {
  constructor(tripPoints) {
    super();
    this._tripPoints = tripPoints;
  }

  _getTemplate() {
    return this._createTotalCostTemplate(this._tripPoints);
  }

  _createTotalCostTemplate() {
    return (
      `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1300</span>
    </p>`
    );
  }
}
