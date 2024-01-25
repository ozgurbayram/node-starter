import { Express } from "express";
import apiRouter from "../api/api.routes";

const setupRoutes = (app: Express) => {
  app.use("/api", apiRouter);
};

export default setupRoutes;
