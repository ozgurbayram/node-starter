// middleware/validateRequest.js
import { NextFunction, Request, Response } from "express";
import Joi, { Schema } from "joi";
import ErrorResponse from "../response/error.response";

export const validateRequest =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return new ErrorResponse(
        { error: error.details },
        "Validation Error"
      ).send(res);
    }
    next();
  };
