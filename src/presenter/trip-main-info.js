import {render} from "../utils/render.js";
import {RenderPosition, replace} from "../utils/render";
import TripMainInfoView from "../view/trip-main-info";
import TotalCostView from "../view/total-cost";

export default class TripMainInfo {
  constructor(tripMainInfoContainer) {
    this._tripMainInfoContainer = tripMainInfoContainer;
    this._tripMainInfo = null;
    this._totalCost = null;
  }

  init() {
    const prevTripMainInfoComponent = this._tripMainInfo;
    const prevTotalCostComponent = this._totalCost;

    this._tripMainInfo = new TripMainInfoView();
    this._totalCost = new TotalCostView();

    if (prevTripMainInfoComponent === null || prevTotalCostComponent === null) {
      render(this._tripMainInfoContainer, this._tripMainInfo, RenderPosition.AFTERBEGIN);
      this._siteTripInfoElement = this._tripMainInfoContainer.querySelector(`.trip-info`);
      this._tripMainInfoContainer.querySelector(`.trip-main__event-add-btn`).disabled = false;
      render(this._siteTripInfoElement, this._totalCost, RenderPosition.BEFOREEND);
    } else {
      replace(this._tripMainInfo, prevTripMainInfoComponent);
      replace(this._totalCost, prevTotalCostComponent);
    }
  }
}
