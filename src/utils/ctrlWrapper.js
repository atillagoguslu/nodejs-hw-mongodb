const ctrlWrapper = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    next(error);
  }
};

//Example usage:
// router.get('/', ctrlWrapper(getAllContacts));

export default ctrlWrapper;
