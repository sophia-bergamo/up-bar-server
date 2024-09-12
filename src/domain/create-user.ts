import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";

function validaEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export class CreateUserUseCase {
  static async createUser(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos!" });
    }

    if (!validaEmail(email)) {
      return res.json({ message: "O formato do email está errado." });
    }

    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Esse email já está cadastrado." });
    }

    const hasDigit = /\d/.test(password);
    if (!hasDigit) {
      return res
        .status(400)
        .json({ message: "A senha deve conter pelo menos um dígito!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRepository.save({
      name,
      email,
      password: hashedPassword,
    });

    return res.json({
      message: "Usuário criado com sucesso!",
      user: newUser,
    });
  }
}
