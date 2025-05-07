import createHttpError from 'http-errors';
import User from '../db/models/auth.js';

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    // We throw bad request
    throw createHttpError(401, 'Bad Request: Bearer is not provided');
  }
  if (!token) {
    // we throw bad request
    throw createHttpError(401, 'Bad Request: Token is not provided');
  }
  const user = await User.findOne({ token });
  if (!user) {
    // we throw unauthorized
    throw createHttpError(401, 'Not authorized: No user found');
  }
  /**
   * If the user is found, we add the user to the request object,
   * because we will use the user in the next middleware.
   * So we can access the user in the next middleware.
   * This is a good trick.
   */
  req.user = user;
  next();
};

export default authenticate;
