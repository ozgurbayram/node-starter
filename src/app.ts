import express, { Express } from "express";
import setupRoutes from "./flow/routes";
import bodyParser from "body-parser";
import "reflect-metadata";
class App {
  public express: Express;

  constructor() {
    this.express = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.express.use(bodyParser.json());
  }

  private initializeRoutes(): void {
    setupRoutes(this.express);
  }
}

export default App;
