import Joi from 'joi';

const reviewSchema = Joi.object({
  review: Joi.string().max(150),
  rating: Joi.number().min(1).max(5).required(),
});

export default reviewSchema;
