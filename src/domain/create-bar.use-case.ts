import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Bar } from "../entities/bar.entity";
import multer from "multer";
import axios from "axios";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage: storage });

async function validaCNPJ(cnpj: string): Promise<boolean> {
  const cnpjLimpo = cnpj.replace(/[^\d]+/g, "");

  try {
    const response = await axios.get(
      `https://www.receitaws.com.br/v1/cnpj/${cnpjLimpo}`
    );

    return response.data.status === "OK";
  } catch (error) {
    console.error("Erro ao validar o CNPJ:", error);
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
    const { name, email, password, cnpj, address, about } = req.body;

    if (!name || !email || !password || !cnpj || !address || !about) {
      return res
        .status(400)
        .json({ error: "Preencha os campos obrigatórios!" });
    }

    if (!validaEmail(email)) {
      return res.json({ message: "O formato do email está errado." });
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

    const isValidCNPJ = await validaCNPJ(cnpj);
    if (!isValidCNPJ) {
      return res.status(400).json({ message: "CNPJ inválido!" });
    }

    const newBar = await barRepository.save({
      ...req.body,
      photo: req.file ? req.file.filename : null,
    });

    return res.json({
      message: "Bar criado com sucesso!",
      user: newBar,
    });
  }
}
