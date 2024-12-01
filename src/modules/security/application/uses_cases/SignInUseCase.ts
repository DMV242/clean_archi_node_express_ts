import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { SignInDto } from "../dtos/SignInDtoRequest";
import { SignInResponseDto } from "../dtos/SignInResponseDto";
import { InvalidCredentialsError } from "../errors/InvalidCredentialsError";

export class SignInUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userData: SignInDto): Promise<SignInResponseDto> {
    const { email, password } = userData;
    const user = await this.userRepository.retrieveOne(email);
    if (user.password !== password) {
      throw new InvalidCredentialsError("Invalid credentials");
    }
    return {
      token: "token",
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }
}
