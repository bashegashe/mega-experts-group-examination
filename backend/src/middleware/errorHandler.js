import Joi from 'joi';
import { sendResponse } from '@/responses';
import { ApiError, DbError } from '@/errors';

const errorHandler = () => ({
  onError: (req) => {
    const { error } = req;

    if (error instanceof Joi.ValidationError) {
      const message = error.details[0].message.replace(/"([^"]+)"/g, '$1');
      req.response = sendResponse(400, message);
      return req.response;
    }
    console.log('error ', error, ' error code ', error.code);
    if (error instanceof DbError) {
      if (error.code === 'ConditionalCheckFailedException') {
        req.response = sendResponse(400, error.message);
      } else {
        req.response = sendResponse(500, error.message);
      }

      return req.response;
    }

    if (error instanceof ApiError) {
      req.response = sendResponse(error.statusCode, error.message);
      return req.response;
    }

    req.response = sendResponse(500, error.message);

    return req.response;
  },
});

export default errorHandler;
