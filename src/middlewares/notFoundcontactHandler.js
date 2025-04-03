const notFoundContactHandler = (req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Contact not found',
  });
};

export default notFoundContactHandler;
