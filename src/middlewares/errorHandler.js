// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const customMessage = err.message || 'Internal Server Error';
  res.status(500).send({
    status: 500,
    message: { customMessage },
    data: {},
  });
};

export default errorHandler;
