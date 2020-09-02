import {generateRandomListItem, getRandomInteger} from "../utils/common";
import {OFFERS_TYPE} from "./additional-option";

const TRIP_POINT_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
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

const generateDestinationPhotos = () => {
  const numberOfPhotos = getRandomInteger(1, 6);
  let eventPhotos = ``;

  for (let i = 0; i < numberOfPhotos; i++) {
    eventPhotos = eventPhotos + `<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo">`;
  }

  return eventPhotos;
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

export const TOWNS_PHOTOS = new Map([
  [`Amsterdam`, generateDestinationPhotos()],
  [`Geneva`, generateDestinationPhotos()],
  [`Colombo`, generateDestinationPhotos()],
  [`Berlin`, generateDestinationPhotos()],
  [`Novosibirsk`, generateDestinationPhotos()],
  [`Moscow`, generateDestinationPhotos()],
  [`Kazan`, generateDestinationPhotos()]
]);

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  currentDate.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59));

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

export const generateTripPoint = () => {
  const destination = generateRandomListItem(TOWNS);
  const tripPointType = generateRandomListItem(TRIP_POINT_TYPES);
  let startDate = generateDate();
  let endDate = generateDate();
  [startDate, endDate] = [startDate - endDate >= 0 ? endDate : startDate, startDate - endDate >= 0 ? startDate : endDate];

  const offers = OFFERS_TYPE.has(tripPointType) ? OFFERS_TYPE.get(tripPointType) : null;
  let additionalOptions = [];
  for (let i = 0; i < offers.length; i++) {
    additionalOptions.push({
      name: offers[i].name,
      cost: offers[i].cost,
      label: offers[i].label,
      isChecked: getRandomInteger(0, 1) ? true : false,
    });
  }

  return {
    id: generateId(),
    tripPointType,
    destination,
    startDate,
    endDate,
    cost: getRandomInteger(50, 300),
    description: TOWNS_DESCRIPTION.get(destination),
    photos: TOWNS_PHOTOS.get(destination),
    additionalOptions,
    isFavorite: false,
  };
};
