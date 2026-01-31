import { UserRepository } from "./user.repository";
import { CreateUserDTO, UpdateUserDTO } from "./user.types";
import { hashPassword, comparePassword } from "../../utils/password";
import { generateToken } from "../../utils/jwt";

export class UserService {
  private userRepository = new UserRepository();

  async create(data: CreateUserDTO) {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async findAll() {
    const users = await this.userRepository.findAll();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }));
  }

  async update(id: string, data: UpdateUserDTO) {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      throw new Error("User not found");
    }

    if (data.email && data.email !== userExists.email) {
      const emailExists = await this.userRepository.findByEmail(data.email);
      if (emailExists) {
        throw new Error("Email already in use");
      }
    }

    const user = await this.userRepository.update(id, data);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  async delete(id: string) {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      throw new Error("User not found");
    }

    await this.userRepository.delete(id);

    return { message: "User deleted successfully" };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  }
}
