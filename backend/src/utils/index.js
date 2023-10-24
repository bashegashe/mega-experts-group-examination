import * as bcrypt from './bcrypt.js';
import * as cookie from './cookie.js';
import * as token from './token.js';

const Utils = {
  bcrypt,
  cookie,
  token,

  prepareItem: (item) => {
    const {
      PK, SK, GSI1PK, GSI1SK, ...rest
    } = item;

    return rest;
  },
};

export default Utils;
