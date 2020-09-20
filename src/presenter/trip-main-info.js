import {render} from "../utils/render.js";
import {remove, RenderPosition, replace} from "../utils/render";
import TripMainInfoView from "../view/trip-main-info";

export default class TripMainInfo {
  constructor(tripMainInfoContainer, pointsModel) {
    this._tripMainInfoContainer = tripMainInfoContainer;
    this._pointsModel = pointsModel;
    this._tripMainInfo = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const prevTripMainInfoComponent = this._tripMainInfo;

    this._tripMainInfo = new TripMainInfoView(this._pointsModel.getPoints().slice());

    if (prevTripMainInfoComponent === null) {
      render(this._tripMainInfoContainer, this._tripMainInfo, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._tripMainInfo, prevTripMainInfoComponent);

    remove(prevTripMainInfoComponent);
  }

  _handleModelEvent() {
    this.init();
  }
}
