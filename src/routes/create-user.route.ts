import { Router } from "express";
import { CreateUserUseCase } from "../domain/create-user";

const createUserRouter = Router();

export default createUserRouter.post(
  "/create-user",
  CreateUserUseCase.createUser
);
