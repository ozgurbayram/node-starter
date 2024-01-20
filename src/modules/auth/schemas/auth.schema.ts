import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).alphanum().required(),
  password_confirm: Joi.string().min(8).alphanum().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).alphanum().required(),
});

export const refreshTokenSchema = Joi.object({
  refresh_token: Joi.string().required(),
});
