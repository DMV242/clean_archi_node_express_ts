import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validationMiddleware<T extends object>(dto: new () => T) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any | Record<string, any>> => {
    if (!Object.keys(req.body).length) {
      return res.status(400).json({ errors: ["Request body is empty"] });
    }
    const dtoInstance = plainToInstance(dto, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      return res
        .status(400)
        .json({ errors: errors.map((err) => err.constraints) });
    }

    next();
  };
}
