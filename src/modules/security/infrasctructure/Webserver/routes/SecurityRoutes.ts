import { Router } from "express";
import { SecurityController } from "../controllers/SecurityController";
import { SignUpRequestDto } from "../../../application/dtos/SignUpRequestDto";
import { SignInRequestDto } from "../../../application/dtos/SignInRequestDto";
import { validationMiddleware } from "../../../../../shared/middlewares/validationMiddleware";

export const securityRoutes = (
  securityController: SecurityController
): Router => {
  const router = Router();
  router.post(
    "/signup",
    validationMiddleware(SignUpRequestDto),
    (req, res, next) =>
      securityController
        .signUp(req, res)
        .then(() => next())
        .catch(next)
  );

  router.post(
    "/signin",
    validationMiddleware(SignInRequestDto),
    (req, res, next) =>
      securityController
        .signIn(req, res)
        .then(() => next())
        .catch(next)
  );

  return router;
};
