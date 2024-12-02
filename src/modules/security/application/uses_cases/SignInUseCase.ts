import { NotFoundError } from "../../../../shared/errors/NotFoundError";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { SignInRequestDto } from "../dtos/SignInRequestDto";
import { SignInResponseDto } from "../dtos/SignInResponseDto";
import { InvalidCredentialsError } from "../errors/InvalidCredentialsError";
import { PasswordEncoder } from "../password_encoder/PasswordEncoder";
import { TokenEncoder } from "../token_encoder/TokenEncoder";

export class SignInUseCase {
  private userRepository: IUserRepository;
  private readonly passwordEncoder: PasswordEncoder;
  private readonly jwtEncoder: TokenEncoder;
  constructor(
    userRepository: IUserRepository,
    passwordEncoder: PasswordEncoder,
    jwtEncoder: TokenEncoder
  ) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtEncoder = jwtEncoder;
  }

  async execute(userData: SignInRequestDto): Promise<SignInResponseDto> {
    const { email, password } = userData;
    const user = await this.userRepository.retrieveOne(email);

    if (!user) {
      throw new NotFoundError("User not found");
    }
    if (!(await this.passwordEncoder.verify(user.password, password))) {
      throw new InvalidCredentialsError("Invalid credentials");
    }
    return {
      token: await this.jwtEncoder.encode({
        email: user.email,
      }),
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }
}
