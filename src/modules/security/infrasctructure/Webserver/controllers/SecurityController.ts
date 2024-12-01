import { Request, Response } from "express";
import { SignUpUseCase } from "../../../application/uses_cases/SignUpUseCase";
import { SignInUseCase } from "../../../application/uses_cases/SignInUseCase";

export class SecurityController {
  private readonly SignUpUseCase: SignUpUseCase;
  private readonly SignInUseCase: SignInUseCase;

  constructor(SignUpUseCase: SignUpUseCase, SignInUseCase: SignInUseCase) {
    this.SignUpUseCase = SignUpUseCase;
    this.SignInUseCase = SignInUseCase;
  }

  async signUp(req: Request, res: Response) {
    try {
      const userData = req.body;
      const user = await this.SignUpUseCase.execute(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const userData = req.body;
      const user = await this.SignInUseCase.execute(userData);

      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
