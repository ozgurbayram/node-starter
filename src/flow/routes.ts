import { Express } from "express";
import authRoutes from "../modules/auth/auth.routes";

const setupRoutes = (app: Express) => {
  app.use("/api/auth", authRoutes);
};

export default setupRoutes;
