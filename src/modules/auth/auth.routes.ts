import { Router } from "express";
import AuthController from "./controllers/auth.controller";
import { routeHandler } from "../../flow/routeHandler";
import { loginSchema } from "./schemas/login.schema";
import { validateRequest } from "../../core/middlewares/validateRequest.middleware";
import { registerSchema } from "./schemas/register.schema";

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

export default router;
