import { Request, Response } from "express";
import { SignUpUseCase } from "../../../application/uses_cases/SignUpUseCase";
import { SignInUseCase } from "../../../application/uses_cases/SignInUseCase";
import { InvalidCredentialsError } from "../../../application/errors/InvalidCredentialsError";
import { NotFoundError } from "../../../../../shared/errors/NotFoundError";
import { UserAlreadyExistsError } from "../../../application/errors/UserAlreadyExistsError";

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
    } catch (error: InvalidCredentialsError | NotFoundError | any) {
      if (error instanceof InvalidCredentialsError) {
        res
          .status(InvalidCredentialsError.statusCode)
          .json({ error: error.message });
      } else if (error instanceof NotFoundError) {
        res.status(error.statusCode).json({ error: error.message });
      } else if (error instanceof UserAlreadyExistsError) {
        res
          .status(UserAlreadyExistsError.statusCode)
          .json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  async signIn(req: Request, res: Response) {
    try {
      const userData = req.body;
      const user = await this.SignInUseCase.execute(userData);

      res.status(200).json(user);
    } catch (error: InvalidCredentialsError | NotFoundError | any) {
      if (error instanceof InvalidCredentialsError) {
        res
          .status(InvalidCredentialsError.statusCode)
          .json({ error: error.message });
      } else if (error instanceof NotFoundError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}
