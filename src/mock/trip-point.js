import {generateRandomListItem, getRandomInteger} from "../utils";
import {generateAdditionalOption} from "./additional-option";

const TOWNS = [`Moscow`, `Dubai`, `Berlin`, `New York`, `Colombo`, `Sochi`];
const TRIP_POINT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

const MAX_ADDITIONAL_OPTIONS = 5;

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

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(1, maxDaysGap);
  const currentDate = new Date();

  currentDate.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59));

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateAdditionalOptions = () => {
  const randomNumber = getRandomInteger(1, MAX_ADDITIONAL_OPTIONS);

  let options = [];

  for (let i = 0; i < randomNumber; i++) {
    options.push(generateAdditionalOption());
  }

  return options;
};

const generateDestinationPhotos = () => {
  const numberOfPhotos = getRandomInteger(1, 6);
  let eventPhotos = ``;

  for (let i = 0; i < numberOfPhotos; i++) {
    eventPhotos = eventPhotos + `<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo">`;
  }

  return eventPhotos;
};

export const generateTripPoint = () => {
  const destinationInfo = generateDestinationInfo();
  let destinationPhotos = [];
  if (destinationInfo !== ``) {
    destinationPhotos = generateDestinationPhotos();
  }
  return {
    tripPointType: generateRandomListItem(TRIP_POINT_TYPES),
    destination: generateRandomListItem(TOWNS),
    destinationInfo,
    destinationPhotos,
    startDate: generateDate(),
    endDate: generateDate(),
    cost: getRandomInteger(100, 10000),
    additionalOptions: generateAdditionalOptions(),
  };
};
