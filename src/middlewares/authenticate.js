import createHttpError from 'http-errors';
import Session from '../db/models/sessions.js';

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    // We throw bad request
    throw createHttpError(400, 'Bad Request: Bearer is not provided');
  }
  if (!token) {
    // we throw bad request
    throw createHttpError(400, 'Bad Request: Token is not provided');
  }
  const session = await Session.findOne({ accessToken: token });
  console.log('In Authenticate Middleware: Session:', session);
  if (!session) {
    throw createHttpError(401, 'Not authorized: No session found');
  }
  if (session.accessToken !== token) {
    throw createHttpError(401, 'Not authorized: Invalid token');
  }
  if (session.accessTokenValidUntil < Date.now()) {
    throw createHttpError(401, 'Not authorized: Access token expired');
  }
  /**
   * If the user is found, we add the user to the request object,
   * because we will use the user in the next middleware.
   * So we can access the user in the next middleware.
   * This is a good trick.
   */
  req.userID = session.userID;
  next();
};

export default authenticate;
