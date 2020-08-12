import {getRandomInteger} from "../utils";
import {ADDITIONAL_OPTIONS} from "../const";

export const generateAdditionalOption = () => {
  return {
    name: ADDITIONAL_OPTIONS[getRandomInteger(0, ADDITIONAL_OPTIONS.length - 1)],
    type: `null`,
    cost: getRandomInteger(15, 30),
  };
};
