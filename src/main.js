import BoardPresenter from "./presenter/board";
import Api from "./api/index";
import Store from "./api/store";
import Provider from "./api/provider";

const AUTHORIZATION = `Basic hS2sd3dfSf4dEsa2j`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
const StoreType = {
  POINTS: `points`,
  OFFERS: `offers`,
  DESTINATIONS: `destinations`
};
const STORE_PREFIX = `big-trip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new Api(END_POINT, AUTHORIZATION);
const storePoints = new Store(StoreType.POINTS + `-` + STORE_NAME, window.localStorage);
const storeDestinations = new Store(StoreType.DESTINATIONS + `-` + STORE_NAME, window.localStorage);
const storeOffers = new Store(StoreType.OFFERS + `-` + STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, storePoints, storeDestinations, storeOffers);

const boardPresenter = new BoardPresenter(apiWithProvider);

boardPresenter.init();

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      console.log(`ServiceWorker available`); // eslint-disable-line
    }).catch(() => {
    console.error(`ServiceWorker isn't available`); // eslint-disable-line
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
