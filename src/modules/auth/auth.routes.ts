import { Router } from "express";
import AuthController from "./controllers/auth.controller";
import { routeHandler } from "../../flow/routeHandler";
import { validateRequest } from "../../core/middlewares/validate-request.middleware";
import {
  loginSchema,
  registerSchema,
  refreshTokenSchema,
} from "./schemas/auth.schema";

const router = Router();

const authController = new AuthController();

router.get(
  "/login",
  validateRequest(loginSchema),
  routeHandler(authController.login.bind(authController))
);

router.post(
  "/register",
  validateRequest(registerSchema),
  routeHandler(authController.register.bind(authController))
);

router.post(
  "/refresh_token",
  validateRequest(refreshTokenSchema),
  routeHandler(authController.refreshToken.bind(authController))
);

export default router;
