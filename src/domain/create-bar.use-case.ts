import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Bar } from "../entities/bar.entity";
import axios from "axios";

async function validaCNPJ(cnpj: string): Promise<boolean> {
  try {
    const response = await axios.get(
      `https://www.receitaws.com.br/v1/cnpj/${cnpj}`
    );

    if (response.data.status === "OK") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

function validaEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export class CreateBarUseCase {
  static async createBar(req: Request, res: Response) {
    const barRepository = AppDataSource.getRepository(Bar);
    const { name, email, password, cnpj, address, about, barPhoto, menuLink } =
      req.body;

    if (!name || !email || !password || !cnpj || !address || !about) {
      return res.status(400).json({ error: "Preencha todos os campos!" });
    }

    if (!validaEmail(email)) {
      return res.status(400).json({ error: "O formato do email está errado." });
    }

    const existingBar = await barRepository.findOneBy({ email });
    if (existingBar) {
      return res.status(400).json({ error: "Esse email já está cadastrado." });
    }

    const hasDigit = /\d/.test(password);
    if (!hasDigit) {
      return res
        .status(400)
        .json({ error: "A senha deve conter pelo menos um dígito!" });
    }

    // const isValidCNPJ = await validaCNPJ(cnpj);
    // if (!isValidCNPJ) {
    //   return res.status(400).json({ error: "CNPJ inválido!" });
    // }

    const file = req.body.barPhoto;

    if (!file.uri) {
      return res.status(400).json({ error: "Por favor, adicione uma foto." });
    }

    const newBar = await barRepository.save({
      name,
      email,
      password,
      cnpj,
      address,
      about,
      photo: req.body.barPhoto.name,
      menu_link: menuLink,
    });

    return res.json({
      message: "Bar criado com sucesso!",
      user: newBar,
    });
  }
}
