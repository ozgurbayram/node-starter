import "reflect-metadata";
import "dotenv/config";
import { Express } from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./integrations/database";
import AuthService from "./modules/auth/services/auth.service";
import { initPassport } from "./modules/auth/passport.config";
import passport from "passport";
import { createExpressServer } from "routing-controllers";
import path from "path";
import { ErrorHandler } from "./core/middlewares/error-handler.middleware";

const controllersPath = path.join(
  __dirname,
  "modules",
  "**",
  "controllers",
  "*.controller{.ts,.js}"
);

class App {
  public express: Express;

  private authService: AuthService;

  constructor() {
    this.express = createExpressServer({
      controllers: [controllersPath],
      routePrefix: "/api",
      middlewares: [bodyParser.json(), ErrorHandler, passport.initialize()],
      defaultErrorHandler: false,
    });

    this.initializeDatabase();

    this.authService = new AuthService();
    this.initializePassport();
  }

  private initializePassport() {
    initPassport(this.authService);
  }

  private initializeDatabase(): void {
    AppDataSource.initialize()
      .then(() => {})
      .catch((err) => console.error("db connection error", err));
  }
}

export default App;
