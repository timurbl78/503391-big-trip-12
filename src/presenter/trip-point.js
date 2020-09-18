import TripPointView from "../view/trip-point";
import TripPointEditView from "../view/trip-point-edit";
import {render, replace, RenderPosition, remove} from "../utils/render";
import {UserAction, UpdateType, State} from "../const.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class TripPoint {
  constructor(tripPointsContainer, destinations, offers, changeData, changeMode) {
    this._tripPointsContainer = tripPointsContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._destinations = destinations;
    this._offers = offers;

    this._tripPointComponent = null;
    this._tripPointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDefaultClick = this._handleDefaultClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(tripPoint) {
    this._tripPoint = tripPoint;

    const prevTripPointComponent = this._tripPointComponent;
    const prevTripPointEditComponent = this._tripPointEditComponent;

    this._tripPointComponent = new TripPointView(tripPoint);
    this._tripPointEditComponent = new TripPointEditView(tripPoint, this._destinations, this._offers);

    this._tripPointEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._tripPointEditComponent.setDefaultClickHandler(this._handleDefaultClick);
    this._tripPointComponent.setEditClickHandler(this._handleEditClick);
    this._tripPointEditComponent.setDeleteClickHandler(this._handleDeleteClick);
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

  setViewState(state) {
    const resetFormState = () => {
      this._tripPointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._tripPointEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._tripPointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._tripPointComponent.shake(resetFormState);
        this._tripPointEditComponent.shake(resetFormState);
        break;
    }
  }

  _replaceCardToForm() {
    replace(this._tripPointEditComponent, this._tripPointComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._tripPointComponent, this._tripPointEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handleDefaultClick() {
    this._tripPointEditComponent.reset(this._tripPoint);
    this._replaceFormToCard();
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit(tripPoint) {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        tripPoint
    );
  }

  _handleDeleteClick(tripPoint) {
    this._changeData(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        tripPoint
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_POINT,
        UpdateType.PATCH,
        Object.assign(
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
}
