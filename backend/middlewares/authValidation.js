import joi from 'joi';

export const LoginValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    Password: joi.string().min(4).max(30).required() 
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message, 
      error: true
    });
  }

  next();
};
