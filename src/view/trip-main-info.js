import AbstractView from "./abstract";

export default class TripMainInfo extends AbstractView {
  _getTemplate() {
    return this._createTripMainInfoTemplate();
  }

  _createTripMainInfoTemplate() {
    return (
      `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>
    </section>`
    );
  }
}
