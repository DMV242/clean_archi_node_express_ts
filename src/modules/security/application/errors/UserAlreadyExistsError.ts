export class UserAlreadyExistsError extends Error {
  static readonly statusCode = 400;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "UserAlreadyExists";
  }
}
