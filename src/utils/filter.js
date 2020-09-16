import {FilterType} from "../const";
import moment from "moment";

export const filter = {
  [FilterType.EVERYTHING]: (tasks) => tasks,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.startDate)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point.endDate))
};

const isPointFuture = (startDate) => {
  const currentDate = new Date();

  return moment(currentDate).isBefore(startDate, `day`);
};

const isPointPast = (endDate) => {
  const currentDate = new Date();

  return moment(currentDate).isAfter(endDate, `day`);
};

