import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth";

const routes = Router();
const controller = new UserController();

routes.post("/", controller.create.bind(controller));
routes.post("/login", controller.login.bind(controller));

// Rotas protegidas por autenticação
routes.get("/", authMiddleware, controller.list.bind(controller));
routes.get("/:id", authMiddleware, controller.findAll.bind(controller));
routes.put("/:id", authMiddleware, controller.update.bind(controller));
routes.delete("/:id", authMiddleware, controller.delete.bind(controller));

export default routes;
