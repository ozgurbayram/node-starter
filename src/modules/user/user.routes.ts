import { Router } from "express";
import UserController from "./controllers/user.controller";
import { routeHandler } from "../../flow/routeHandler";
import { isAuthenticated } from "../../core/middlewares/authentication.middleware";

const router = Router();
const userController = new UserController();

router.get("/me", routeHandler(userController.me.bind(userController)));

router.get(
  "/all",
  isAuthenticated,
  routeHandler(userController.getAllUsers.bind(userController))
);

export default router;
