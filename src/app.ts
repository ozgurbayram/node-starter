import "reflect-metadata";
import "dotenv/config";
import express, { Express } from "express";
import setupRoutes from "./flow/routes";
import bodyParser from "body-parser";
import { AppDataSource } from "./integrations/database";
import { errorHandler } from "./core/middlewares/error-handler.middleware";

class App {
  public express: Express;

  constructor() {
    this.express = express();
    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.express.use(bodyParser.json());
  }

  private initializeRoutes(): void {
    setupRoutes(this.express);
    this.express.use(errorHandler);
  }

  private initializeDatabase(): void {
    AppDataSource.initialize()
      .then(() => {})
      .catch((err) => console.error("db connection error", err));
  }
}

export default App;
