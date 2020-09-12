import {getRandomInteger} from "../utils/common";

export const TRIP_POINT_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
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
  let eventPhotos = [];

  for (let i = 0; i < numberOfPhotos; i++) {
    eventPhotos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
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

export const DESTINATION = [
  {
    description: TOWNS_DESCRIPTION.get(`Amsterdam`),
    name: `Amsterdam`,
    pictures: TOWNS_PHOTOS.get(`Amsterdam`)
  },
  {
    description: TOWNS_DESCRIPTION.get(`Geneva`),
    name: `Geneva`,
    pictures: TOWNS_PHOTOS.get(`Geneva`)
  },
  {
    description: TOWNS_DESCRIPTION.get(`Berlin`),
    name: `Berlin`,
    pictures: TOWNS_PHOTOS.get(`Berlin`)
  },
  {
    description: TOWNS_DESCRIPTION.get(`Colombo`),
    name: `Colombo`,
    pictures: TOWNS_PHOTOS.get(`Colombo`)
  },
  {
    description: TOWNS_DESCRIPTION.get(`Novosibirsk`),
    name: `Novosibirsk`,
    pictures: TOWNS_PHOTOS.get(`Novosibirsk`)
  },
  {
    description: TOWNS_DESCRIPTION.get(`Moscow`),
    name: `Moscow`,
    pictures: TOWNS_PHOTOS.get(`Moscow`)
  },
  {
    description: TOWNS_DESCRIPTION.get(`Kazan`),
    name: `Kazan`,
    pictures: TOWNS_PHOTOS.get(`Kazan`)
  }
];
