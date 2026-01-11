import { Router } from "express";
import userRoutes from "../modules/user/user.routes";

const routes = Router();

routes.get("/health", (_req, res) => {
  return res.json({ status: "ok" });
});

routes.use("/users", userRoutes);

export default routes;
