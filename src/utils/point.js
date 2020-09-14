export const sortByDate = (pointA, pointB) => {
  return (pointB.endDate.getTime() - pointB.startDate.getTime()) - (pointA.endDate.getTime() - pointA.startDate.getTime());
};

export const sortByPrice = (pointA, pointB) => {
  return pointB.cost - pointA.cost;
};

export const sortByEvent = (pointA, pointB) => {
  return pointA.startDate - pointB.startDate;
};

export const formatDatesDifference = (dateDiff) => {
  const daysDiff = Math.floor(dateDiff / (24 * 60 * 60 * 1000));
  dateDiff -= daysDiff * (24 * 60 * 60 * 1000);
  const hoursDiff = Math.floor(dateDiff / (1000 * 60 * 60));
  dateDiff -= hoursDiff * (60 * 60 * 1000);
  const minutesDiff = Math.floor(dateDiff / (60 * 1000));

  let dateDiffString = ``;
  if (daysDiff) {
    if (daysDiff < 10) {
      dateDiffString += `0` + daysDiff + `D `;
    } else {
      dateDiffString += daysDiff + `D `;
    }
  }
  if (hoursDiff) {
    if (hoursDiff < 10) {
      dateDiffString += `0` + hoursDiff + `H `;
    } else {
      dateDiffString += hoursDiff + `H `;
    }
  }
  if (minutesDiff < 10) {
    dateDiffString += `0` + minutesDiff + `M`;
  } else {
    dateDiffString += minutesDiff + `M`;
  }

  return dateDiffString;
};

export const getOffersByType = (type, offers) => {
  for (let i = 0; i < offers.length; i++) {
    if (offers[i].type === type) {
      return offers[i].offers;
    }
  }

  return [];
};

export const getDestinationByName = (name, destinations) => {
  for (let i = 0; i < destinations.length; i++) {
    if (destinations[i].name === name) {
      return destinations[i];
    }
  }

  return {};
};

export const isHasTown = (town, destinations) => {
  for (let i = 0; i < destinations.length; i++) {
    if (destinations[i].name === town) {
      return true;
    }
  }

  return false;
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);
