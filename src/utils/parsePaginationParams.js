const parseNumber = (number, defaultValue) => {
  const isString = typeof number === 'string';

  if (!isString) {
    console.error('parseNumber: number is not a string');
    return defaultValue;
  }

  const parsedNumber = parseInt(number);

  // If the parsed number is NaN, return the default value
  if (Number.isNaN(parsedNumber)) {
    console.error('parseNumber: number is NaN');
    return defaultValue;
  }

  // If the parsed number is negative, return the default value
  if (parsedNumber < 0) {
    console.error('parseNumber: number is negative');
    return defaultValue;
  }

  return parsedNumber;
};

// The main function to parse the pagination params
const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};

export default parsePaginationParams;
