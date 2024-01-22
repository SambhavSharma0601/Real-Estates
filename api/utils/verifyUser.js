import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return next(errorHandler(401, 'Unauthorized'));
  }

  const [bearer, token] = authorizationHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(errorHandler(401, 'Invalid token format'));
  }
  // console.log("token is : " + token);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return next(errorHandler(401, 'Token expired'));
      }
      return next(errorHandler(403, 'Forbidden'));
    }

    req.user = user;
    next();
  });
};
