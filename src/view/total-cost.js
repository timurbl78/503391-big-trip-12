export const createTotalCostTemplate = (tripPoints) => {
  let totalCost = 0;

  for (let i = 0; i < tripPoints.length; i++) {
    totalCost += tripPoints[i].cost;
  }

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
    </p>`
  );
};
