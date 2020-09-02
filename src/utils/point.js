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
  return (pointB.endDate.getTime() - pointB.startDate.getTime()) - (pointA.endDate.getTime() - pointA.startDate.getTime());
};

export const sortByPrice = (pointA, pointB) => {
  return pointB.cost - pointA.cost;
};

export const sortByEvent = (pointA, pointB) => {
  return pointA.startDate - pointB.startDate;
};
