export const generateFullTrip = (tripPoints) => {
  let fullTrip = [];
  for (let i = 0; i < tripPoints.length; i++) {
    fullTrip.push(tripPoints[i].destination);
  }

  return fullTrip;
}
