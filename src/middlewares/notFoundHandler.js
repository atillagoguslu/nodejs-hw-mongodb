const notFoundHandler = (req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Not found (Endpoint does not exist)',
  });
};

export default notFoundHandler;
