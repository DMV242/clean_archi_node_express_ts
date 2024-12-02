import jwt from "jsonwebtoken";
import { TokenEncoder } from "../../application/token_encoder/TokenEncoder";

export class JwtTokenEncoder implements TokenEncoder {
  constructor(private secret: string) {}

  async encode(payload: any): Promise<string> {
    return jwt.sign(payload, this.secret);
  }

  async decode(token: string): Promise<any> {
    return await jwt.verify(token, this.secret);
  }
}
