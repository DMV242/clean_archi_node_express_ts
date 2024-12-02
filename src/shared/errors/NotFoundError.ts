export class NotFoundError extends Error {
  readonly statusCode = 404;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "NotFoundError";
  }
}
