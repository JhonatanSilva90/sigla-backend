import { Router } from "express";
import { UserController } from "./user.controller";

const routes = Router();
const controller = new UserController();

routes.post("/", controller.create);

export default routes;
