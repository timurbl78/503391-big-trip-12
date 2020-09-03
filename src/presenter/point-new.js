import TripPointEdit from "../view/trip-point-edit";
import {generateId} from "../mock/trip-point";
import {remove} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";

export default class PointNew {
  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;

    this._tripPointEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleDefaultClick = this._handleDefaultClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._taskEditComponent !== undefined) {
      return;
    }

    this._tripPointEditComponent = new TripPointEdit();
    this._tripPointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._tripPointEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._tripPointEditComponent.setDefaultClickHandler(this._handleDefaultClick);

    const tripDaysComponent = this._container.querySelector(`.trip-days`);
    const component = this._tripPointEditComponent.getElement();
    component.classList.add(`trip-events__item`);
    this._container.insertBefore(component, tripDaysComponent);

    // render(this._container, this._tripPointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._tripPointEditComponent === undefined) {
      return;
    }

    remove(this._tripPointEditComponent);
    this._taskEditComponent = undefined;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        Object.assign({id: generateId()}, point)
    );
    this.destroy();
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
