import { prisma } from "../../prisma/client";
import { CreateUserDTO } from "./user.types";

export class UserService {
  async create(data: CreateUserDTO) {
    const userExists = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (userExists) {
      throw new Error("User already exists");
    }

    const user = await prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }
}
