import {getRandomInteger} from "../utils/common";
import {ADDITIONAL_OPTIONS} from "../const";

const MAX_ADDITIONAL_OPTIONS = 5;

const generateAdditionalOption = () => {
  return {
    name: ADDITIONAL_OPTIONS[getRandomInteger(0, ADDITIONAL_OPTIONS.length - 1)],
    type: `null`,
    cost: getRandomInteger(15, 30),
  };
};

const generateAdditionalOptions = () => {
  const randomNumber = getRandomInteger(1, MAX_ADDITIONAL_OPTIONS);

  let options = [];

  for (let i = 0; i < randomNumber; i++) {
    options.push(generateAdditionalOption());
  }

  return options;
};

export const OFFERS_TYPE = new Map([
  [`taxi`, generateAdditionalOptions()],
  [`bus`, generateAdditionalOptions()],
  [`train`, generateAdditionalOptions()],
  [`ship`, generateAdditionalOptions()],
  [`transport`, generateAdditionalOptions()],
  [`drive`, generateAdditionalOptions()],
  [`flight`, generateAdditionalOptions()],
  [`check-in`, generateAdditionalOptions()],
  [`sightseeing`, generateAdditionalOptions()],
  [`restaurant`, generateAdditionalOptions()],
]);
