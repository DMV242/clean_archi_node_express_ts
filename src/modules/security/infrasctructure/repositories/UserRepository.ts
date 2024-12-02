import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User, UserProps } from "../../domain/entities/User";
import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "../../../../shared/errors/NotFoundError";

export class UserRepository implements IUserRepository {
  private prismaClient = new PrismaClient();

  async add(user: User): Promise<UserProps> {
    const userData = user.toObject();
    return await this.prismaClient.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
    });
  }

  async retrieveOne(email: string): Promise<UserProps | null> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }
}
