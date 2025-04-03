import { HttpError } from 'http-errors';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).send({
      status: err.statusCode,
      message: err.message,
      data: {},
    });
  }
  res.status(500).send({
    status: 500,
    message: '500 Internal Server Error',
    data: {},
  });
};

export default errorHandler;
