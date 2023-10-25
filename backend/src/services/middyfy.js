import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import Middleware from '@/middleware';

const middyfy = (handler, schema) => {
  if (schema) {
    return middy(handler)
      .use(middyJsonBodyParser())
      .use(Middleware.validateSchema(schema))
      .use(Middleware.errorHandler());
  }

  return middy(handler)
    .use(Middleware.errorHandler());
};

export default middyfy;
