import { Request, Response, NextFunction } from "express";

export function routeHandler(
  controllerMethod: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      controllerMethod(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
