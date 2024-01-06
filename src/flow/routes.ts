import { Express } from "express";
import authRoutes from "../modules/auth/auth.routes";

const setupRoutes = (app: Express) => {
  // Auth
  app.use("/api/auth", authRoutes);
  // Advert
};

export default setupRoutes;
