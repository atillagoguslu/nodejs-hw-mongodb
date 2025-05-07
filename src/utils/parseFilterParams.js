import FAVOURITE from '../constants/favourite.js';
import TYPES from '../constants/types.js';

const isString = (value) => {
  return typeof value === 'string';
};

const isKnownValue = (value) => {
  return value === FAVOURITE.TRUE || value === FAVOURITE.FALSE || value === FAVOURITE.ALL;
};

const isKnownType = (value) => {
  return value === TYPES.WORK || value === TYPES.HOME || value === TYPES.PERSONAL;
};

const parseFilterParams = (query) => {
  const { favourite, type } = query;

  let isFavourite = FAVOURITE.ALL; // Default value
  let contactType = TYPES.ALL; // Default value

  if (isString(favourite) && isKnownValue(favourite)) {
    if (favourite === FAVOURITE.TRUE) {
      isFavourite = true;
    } else if (favourite === FAVOURITE.FALSE) {
      isFavourite = false;
    }
    // If favourite === FAVOURITE.ALL, isFavourite remains FAVOURITE.ALL (default)
  }

  if (isString(type) && isKnownType(type)) {
    contactType = type;
  }

  return { isFavourite, contactType };
};

export default parseFilterParams;
