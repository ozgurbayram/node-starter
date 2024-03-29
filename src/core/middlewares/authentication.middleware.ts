import { Request, Response, NextFunction } from "express";
import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";

export class IsAuthenticated implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    try {
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  }
}
