import {generateRandomListItem, getRandomInteger} from "../utils/common";
import {OFFERS_TYPE} from "./additional-option";
import {OFFERS} from "./additional-option";
import {DESTINATION} from "./destination";

export const TRIP_POINT_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
const TOWNS = [`Amsterdam`, `Geneva`, `Berlin`, `Colombo`, `Novosibirsk`, `Moscow`, `Kazan`];
const RANDOM_TEXTS = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
  `Cras aliquet varius magna, non porta ligula feugiat eget. `,
  `Fusce tristique felis at fermentum pharetra. `,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. `,
  `Sed sed nisi sed augue convallis suscipit in sed felis. `,
  `Aliquam erat volutpat. `,
  `Nunc fermentum tortor ac porta dapibus. `,
  `In rutrum ac purus sit amet tempus. `];

const generateDestinationInfo = () => {
  const sentenceCount = getRandomInteger(0, 5);

  let destinationInfo = ``;
  for (let i = 0; i < sentenceCount; i++) {
    let randomIndex = getRandomInteger(0, RANDOM_TEXTS.length - 1);
    destinationInfo = destinationInfo + RANDOM_TEXTS[randomIndex];
  }

  return destinationInfo;
};

export const TOWNS_DESCRIPTION = new Map([
  [`Amsterdam`, generateDestinationInfo()],
  [`Geneva`, generateDestinationInfo()],
  [`Colombo`, generateDestinationInfo()],
  [`Berlin`, generateDestinationInfo()],
  [`Novosibirsk`, generateDestinationInfo()],
  [`Moscow`, generateDestinationInfo()],
  [`Kazan`, generateDestinationInfo()]
]);

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  currentDate.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59));

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

export const generateTripPoint = () => {
  const destinationName = generateRandomListItem(TOWNS);
  const tripPointType = generateRandomListItem(TRIP_POINT_TYPES);
  let startDate = generateDate();
  let endDate = generateDate();
  [startDate, endDate] = [startDate - endDate >= 0 ? endDate : startDate, startDate - endDate >= 0 ? startDate : endDate];

  let destination;

  for (let i = 0; i < DESTINATION.length; i++) {
    if (DESTINATION[i].name === destinationName) {
      destination = DESTINATION[i];
    }
  }

  let offers;

  for (let i = 0; i < OFFERS.length; i++) {
    if (OFFERS[i].type === tripPointType) {
      offers = OFFERS[i].offers;
    }
  }

  return {
    id: generateId(),
    tripPointType,
    destination,
    offers,
    startDate,
    endDate,
    cost: getRandomInteger(50, 300),
    isFavorite: false,
  };
};
