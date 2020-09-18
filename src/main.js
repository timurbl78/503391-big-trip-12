import BoardPresenter from "./presenter/board";
import Api from "./api";

const AUTHORIZATION = `Basic hS2sd3dfSf4dEsa2j`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const api = new Api(END_POINT, AUTHORIZATION);

const boardPresenter = new BoardPresenter(api);

boardPresenter.init();
