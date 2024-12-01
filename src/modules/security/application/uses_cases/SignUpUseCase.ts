import { User, UserProps } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { SignUpResponseDto } from "../dtos/SignUpResponseDto";

export class SignUpUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData: UserProps): Promise<SignUpResponseDto> {
    const { email, password, firstName, lastName } = userData;
    const user = new User(email, password, firstName, lastName);
    const createdUser = await this.userRepository.add(user);
    return {
      token: "token",
      user: {
        email: createdUser.email,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
      },
    };
  }
}
