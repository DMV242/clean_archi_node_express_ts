export interface PasswordEncoder {
  encode(password: string): Promise<string>;
  verify(password: string, encodedPassword: string): Promise<boolean>;
}
