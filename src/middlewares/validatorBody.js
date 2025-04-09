import createHttpError from 'http-errors';

const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const validationError = createHttpError(400, error.message);
    next(validationError);
  }
};

export default validateBody;
