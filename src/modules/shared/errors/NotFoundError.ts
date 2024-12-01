class NotFoundError extends Error {
  static readonly code = 404;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "NotFoundError";
  }
}
