import { PasswordEncoder } from "../../application/password_encoder/PasswordEncoder";
import argon2 from "argon2";

export class Argon2Encoder implements PasswordEncoder {
  async encode(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  async verify(encodedPassword: string, password: string): Promise<boolean> {
    return await argon2.verify(encodedPassword, password);
  }
}
