import "reflect-metadata";
import "dotenv/config";
import { Express } from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./integrations/database";
import { errorHandler } from "./core/middlewares/error-handler.middleware";
import AuthService from "./modules/auth/services/auth.service";
import { initPassport } from "./modules/auth/passport.config";
import passport from "passport";
import { createExpressServer } from "routing-controllers";
import path from "path";

const controllersPath = path.join(
  __dirname,
  "modules",
  "**",
  "controllers",
  "*.controller{.ts,.js}"
);

console.log(controllersPath);

class App {
  public express: Express;

  private authService: AuthService;

  constructor() {
    this.express = createExpressServer({
      controllers: [controllersPath],
      routePrefix: "/api",
    });

    this.initializeDatabase();

    this.initializeMiddlewares();

    this.authService = new AuthService();

    this.initializePassport();
  }

  private initializeMiddlewares(): void {
    this.express.use(bodyParser.json());
    this.express.use(errorHandler);
  }

  private initializePassport() {
    this.express.use(passport.initialize());
    initPassport(this.authService);
  }

  private initializeDatabase(): void {
    AppDataSource.initialize()
      .then(() => {})
      .catch((err) => console.error("db connection error", err));
  }
}

export default App;
