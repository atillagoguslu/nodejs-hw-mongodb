import createHttpError from 'http-errors';

const validateBody = (schema) => async (req, res, next) => {
  // If password exists and is not a string, return a 400 error
  if (req.body.password && typeof req.body.password !== 'string') {
    return next(createHttpError(400, 'Password must be a string'));
  }

  try {
    await schema.validate(req.body, { abortEarly: false });
    console.log('In Validate Body Middleware: Validated Body:', req.body);
    next();
  } catch (error) {
    console.log('In Validate Body Middleware: Error:', error);
    const validationError = createHttpError(400, error.message);
    next(validationError);
  }
};

export default validateBody;
