import TripPointEdit from "../view/trip-point-edit";
import {remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

export default class PointNew {
  constructor(container, changeData, siteTripMainElement, offers, destinations) {
    this._container = container;
    this._changeData = changeData;
    this._siteTripMainElement = siteTripMainElement;
    this._offers = offers;
    this._destinations = destinations;

    this._tripPointEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleDefaultClick = this._handleDefaultClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._tripPointEditComponent !== null) {
      return;
    }

    this._tripPointEditComponent = new TripPointEdit(null, this._destinations, this._offers);
    this._tripPointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._tripPointEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._tripPointEditComponent.setDefaultClickHandler(this._handleDefaultClick);

    const tripDaysComponent = this._container.querySelector(`.trip-days`);
    const component = this._tripPointEditComponent.getElement();
    this._container.insertBefore(component, tripDaysComponent);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    this._siteTripMainElement.querySelector(`.trip-main__event-add-btn`).disabled = false;

    if (this._tripPointEditComponent === undefined) {
      return;
    }

    remove(this._tripPointEditComponent);
    this._tripPointEditComponent = undefined;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setSaving() {
    this._tripPointEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  _handleFormSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        point
    );
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _handleDefaultClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
