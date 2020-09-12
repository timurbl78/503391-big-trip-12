import BoardPresenter from "./presenter/board";
import {generateTripPoint} from "./mock/trip-point";
import Api from "./api";

const EVENTS_COUNT = 20;

const AUTHORIZATION = `Basic hS2sd3dfSf4dEsa2j`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const api = new Api(END_POINT, AUTHORIZATION);

api.getPoints().then((points) => {

});

const tripPoints = new Array(EVENTS_COUNT).fill().map(generateTripPoint);

const boardPresenter = new BoardPresenter(tripPoints);

boardPresenter.init();
