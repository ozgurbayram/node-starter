import { Router } from "express";
import AuthController from "./controllers/auth.controller";
import { routeHandler } from "../../flow/routeHandler";

const router = Router();

const authController = new AuthController();

router.get("/login", routeHandler(authController.login.bind(authController)));

export default router;
