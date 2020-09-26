import {nanoid} from "nanoid";
import PointsModel from "../model/points.js";

const getSyncedTasks = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, storePoints, storeDestinations, storeOffers) {
    this._api = api;
    this._storePoints = storePoints;
    this._storeDestinations = storeDestinations;
    this._storeOffers = storeOffers;
  }

  getPoints() {
    if (Provider.isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          const items = createStoreStructure(points.map(PointsModel.adaptToServer));
          this._storePoints.setItems(items);
          return points;
        });
    }

    const storePoints = Object.values(this._storePoints.getItems());

    return Promise.resolve(storePoints.map(PointsModel.adaptToClient));
  }

  getDestinations() {
    if (Provider.isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          this._storeDestinations.setItems(destinations);
          return destinations;
        });
    }

    const storeDestinations = Object.values(this._storeDestinations.getItems());

    return Promise.resolve(storeDestinations);
  }

  getOffers() {
    if (Provider.isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          this._storeOffers.setItems(offers);
          return offers;
        });
    }

    const storeOffers = Object.values(this._storeOffers.getItems());

    return Promise.resolve(storeOffers);
  }

  updatePoint(point) {
    if (Provider.isOnline()) {
      return this._api.updatePoint(point)
        .then((updatedPoint) => {
          this._storePoints.setItem(updatedPoint.id, PointsModel.adaptToServer(updatedPoint));
          return updatedPoint;
        });
    }

    this._storePoints.setItem(point.id, PointsModel.adaptToServer(Object.assign({}, point)));

    return Promise.resolve(point);
  }

  addPoint(point) {
    if (Provider.isOnline()) {
      return this._api.addPoint(point)
        .then((newPoint) => {
          this._storePoints.setItem(newPoint.id, PointsModel.adaptToServer(newPoint));
          return newPoint;
        });
    }

    const localNewPointId = nanoid();
    const localNewPoint = Object.assign({}, point, {id: localNewPointId});

    this._storePoints.setItem(localNewPoint.id, PointsModel.adaptToServer(localNewPoint));

    return Promise.resolve(localNewPoint);
  }

  deletePoint(point) {
    if (Provider.isOnline()) {
      return this._api.deletePoint(point)
        .then(() => this._storePoints.removeItem(point.id));
    }

    this._storePoints.removeItem(point.id);

    return Promise.resolve();
  }

  sync() {
    if (Provider.isOnline()) {
      const storePoints = Object.values(this._storePoints.getItems());

      return this._api.sync(storePoints)
        .then((response) => {
          const createdPoints = getSyncedTasks(response.created);
          const updatedPoints = getSyncedTasks(response.updated);

          const items = createStoreStructure([...createdPoints, ...updatedPoints]);

          this._storePoints.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
