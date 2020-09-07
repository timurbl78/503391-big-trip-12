export const TRIP_POINTS_MAP = new Map([[`taxi`, `to`], [`bus`, `to`], [`train`, `to`], [`ship`, `to`], [`transport`, `to`],
  [`drive`, `to`], [`flight`, `to`], [`check-in`, `in`], [`sightseeing`, `in`], [`restaurant`, `in`]]);
export const TRIP_POINT_TRANSFER_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
export const TRIP_POINT_ACTIVITIES_TYPE = [`check-in`, `sightseeing`, `restaurant`];

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const MenuItem = {
  TABLE: `TABLE`,
  STATS: `STATS`
};
