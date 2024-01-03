import { Express } from "express";
import authRoutes from "../modules/auth/auth.routes";
import bodyParser from "body-parser";

const setupRoutes = (app: Express) => {
  // Auth
  app.use("/api/auth", authRoutes);
  // Advert
};

export default setupRoutes;
