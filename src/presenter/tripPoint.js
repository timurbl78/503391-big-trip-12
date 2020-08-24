import TripPointView from "../view/trip-point";
import TripPointEditView from "../view/trip-point-edit"
import {render, replace, RenderPosition, remove} from "../utils/render";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class TripPoint {
  constructor(tripPointsContainer, changeData, changeMode) {
    this._tripPointsContainer = tripPointsContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._tripPointComponent = null;
    this._tripPointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleDefaultClick = this._handleDefaultClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(tripPoint) {
    this._tripPoint = tripPoint;

    const prevTripPointComponent = this._tripPointComponent;
    const prevTripPointEditComponent = this._tripPointEditComponent;

    this._tripPointComponent = new TripPointView(tripPoint);
    this._tripPointEditComponent = new TripPointEditView(tripPoint);

    this._tripPointEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._tripPointEditComponent.setDefaultClickHandler(this._handleDefaultClick);
    this._tripPointComponent.setEditClickHandler(this._handleEditClick);
    this._tripPointEditComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevTripPointComponent === null || prevTripPointEditComponent === null) {
      render(this._tripPointsContainer, this._tripPointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._tripPointComponent, prevTripPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._tripPointEditComponent, prevTripPointEditComponent);
    }

    remove(prevTripPointComponent);
    remove(prevTripPointEditComponent);
  }

  destroy() {
    remove(this._tripPointComponent);
    remove(this._tripPointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _handleDefaultClick() {
    this._tripPointEditComponent.reset(this._tripPoint);
    this._replaceFormToCard();
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit(task) {
    this._changeData(task);
    this._replaceFormToCard();
  }

  _handleFavoriteClick() {
    this._changeData(Object.assign(
      {},
      this._tripPoint,
      {
        isFavorite: !this._tripPoint.isFavorite
      }
    ));
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._tripPointEditComponent.reset(this._tripPoint);
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._tripPointEditComponent, this._tripPointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  };

  _replaceFormToCard() {
    replace(this._tripPointComponent, this._tripPointEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  };
}
