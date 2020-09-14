import AbstractView from "./abstract.js";

const createNoTaskTemplate = () => {
  return `<p class="trip-events__msg">
    Loading...
  </p>`;
};

export default class Loading extends AbstractView {
  _getTemplate() {
    return createNoTaskTemplate();
  }
}
