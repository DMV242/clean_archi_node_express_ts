export class InvalidCredentialsError extends Error {
  static readonly statusCode = 401;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "InvalidCredentialsError";
  }
}
