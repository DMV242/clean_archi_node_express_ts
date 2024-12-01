import { User, UserProps } from "../entities/User";

export interface IUserRepository {
  add(user: User): Promise<UserProps>;
  retrieveOne(email: string): Promise<UserProps>;
}
