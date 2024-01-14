import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: {
    status?: number;
    message: string;
  },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message;
  res.status(status).json({ error: message, status: status }).send();
};
