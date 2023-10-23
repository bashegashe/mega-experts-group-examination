const validateSchema = (schema) => ({
  before: (req) => {
    if (schema) {
      const { error } = schema.validate(req.event.body);
      if (error) throw error;
    }
  },
});

export default validateSchema;
