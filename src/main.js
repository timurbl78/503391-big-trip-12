import BoardPresenter from "./presenter/board";
import {generateTripPoint} from "./mock/trip-point";

const EVENTS_COUNT = 20;

const tripPoints = new Array(EVENTS_COUNT).fill().map(generateTripPoint);

const boardPresenter = new BoardPresenter(tripPoints);

boardPresenter.init();
