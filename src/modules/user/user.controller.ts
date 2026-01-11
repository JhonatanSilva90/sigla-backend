import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const service = new UserService();
      const user = await service.create({ name, email, password });

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
