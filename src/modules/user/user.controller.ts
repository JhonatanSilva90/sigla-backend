import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
  private userService = new UserService();

  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const user = await this.userService.create({ name, email, password });

      console.log(`ola `, req.body);

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
