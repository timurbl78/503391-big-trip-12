const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortByDate = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.startDate, pointB.startDate);

  if (weight !== null) {
    return weight;
  }

  return pointA.startDate.getTime() - pointB.startDate.getTime();
};

export const sortByPrice = (pointA, pointB) => {
  return pointA.cost - pointB.cost;
};

export const sortByEvent = (pointA, pointB) => {
  return pointA.tripPointType >= pointB.tripPointType;
};
