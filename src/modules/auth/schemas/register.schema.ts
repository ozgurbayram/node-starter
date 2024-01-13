import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).alphanum().required(),
  password_confirm: Joi.string().min(8).alphanum().required(),
});
