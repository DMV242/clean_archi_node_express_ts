import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../../../../shared/errors/UnauthorizedError";
import { TokenEncoder } from "../../../application/token_encoder/TokenEncoder";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export class IsAuthenticatedMiddleware {
  private readonly tokenEncoder: TokenEncoder;

  constructor(tokenEncoder: TokenEncoder) {
    this.tokenEncoder = tokenEncoder;
  }

  async verify(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any | Record<string, any>> {
    try {
      const authHeaders = req.headers.authorization;
      const token = authHeaders && authHeaders.split(" ")[1];
      if (!token) {
        throw new UnauthorizedError("You are not authorized");
      }
      req.user = this.tokenEncoder.decode(token);
      if (!token) {
        throw new UnauthorizedError("You are not authorized");
      }
      next();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: "Server error" });
    }
  }
}

// export async function isAuthenticated(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<any | Record<string, any>> {
//   {
//     try {
//       const authHeaders = req.headers.authorization;
//       const token = authHeaders && authHeaders.split(" ")[1];
//       const jwtTokenEncoder = new JwtTokenEncoder(process.env.JWT_SECRET!);
//       if (!token) {
//         throw new UnauthorizedError("You are not authorized");
//       }
//       req.user = await jwtTokenEncoder.decode(token);
//       if (!token) {
//         throw new UnauthorizedError("You are not authorized");
//       }
//       next();
//     } catch (error) {
//       if (error instanceof UnauthorizedError) {
//         return res.status(error.statusCode).json({ error: error.message });
//       }
//       return res.status(500).json({ error: "Server error" });
//     }
//   }
// }
