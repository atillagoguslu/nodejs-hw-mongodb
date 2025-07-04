import createHttpError from 'http-errors';

const validateBody = (schema) => async (req, res, next) => {
  // If password exists and is not a string, return a 400 error
  if (req.body.password && typeof req.body.password !== 'string') {
    return next(createHttpError(400, 'Password must be a string'));
  }

  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const validationError = createHttpError(400, 'Validation error: ' + error.message);
    next(validationError);
  }
};

export default validateBody;
