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
      console.error("no Error caught in routeHandler:");
      controllerMethod(req, res, next);
    } catch (error) {
      console.error("Error caught in routeHandler:", error);
      next(error);
    }
  };
}
