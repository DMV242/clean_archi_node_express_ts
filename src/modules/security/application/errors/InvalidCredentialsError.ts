class InvalidCredentialsError extends Error {
  static readonly code = 401;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "InvalidCredentialsError";
  }
}
