import { Router } from "express";
import { SecurityController } from "../controllers/SecurityController";
import { SignUpDto } from "../../../application/dtos/SignUpDtoRequest";
import { validationMiddleware } from "../../../../shared/middlewares/validationMiddleware";
import { SignInDto } from "../../../application/dtos/SignInDtoRequest";

export const securityRoutes = (
  securityController: SecurityController
): Router => {
  const router = Router();
  router.post("/signup", validationMiddleware(SignUpDto), (req, res, next) =>
    securityController
      .signUp(req, res)
      .then(() => next())
      .catch(next)
  );

  router.post("/signin", validationMiddleware(SignInDto), (req, res, next) =>
    securityController
      .signIn(req, res)
      .then(() => next())
      .catch(next)
  );

  return router;
};
