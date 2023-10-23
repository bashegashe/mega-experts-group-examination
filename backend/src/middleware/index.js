import checkAuth from './checkAuth.js';
import validateSchema from './validateSchema.js';
import errorHandler from './errorHandler.js';

const Middleware = {
  checkAuth,
  validateSchema,
  errorHandler,
};

export default Middleware;
