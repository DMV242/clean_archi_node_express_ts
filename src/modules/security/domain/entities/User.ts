export type UserProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export class User {
  constructor(
    private email: string,
    private password: string,
    private firstName: string,
    private lastName: string
  ) {}

  toObject() {
    return {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }
}
