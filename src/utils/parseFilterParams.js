import FAVOURITE from '../constants/favourite.js';

const isString = (value) => {
  return typeof value === 'string';
};

const isKnownValue = (value) => {
  return (
    value === FAVOURITE.TRUE ||
    value === FAVOURITE.FALSE ||
    value === FAVOURITE.ALL
  );
};

const parseFilterParams = (query) => {
  const { favourite } = query;
  if (!favourite || !isString(favourite) || !isKnownValue(favourite)) {
    return { isFavourite: FAVOURITE.ALL };
  }
  if (favourite === FAVOURITE.TRUE) {
    return { isFavourite: true };
  }
  if (favourite === FAVOURITE.FALSE) {
    return { isFavourite: false };
  }
  if (favourite === FAVOURITE.ALL) {
    return { isFavourite: FAVOURITE.ALL };
  }
  return { isFavourite: FAVOURITE.ALL }; // Fallback
};

export default parseFilterParams;
