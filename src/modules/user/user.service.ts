import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./user.types";

export class UserService {
  private userRepository = new UserRepository();

  async create(data: CreateUserDTO) {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new Error("User already exists");
    }

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: data.password, // depois vamos aplicar hash
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}
