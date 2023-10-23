import Joi from 'joi';

const authSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
});

export default authSchema;
