import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { SignUpRequestDto } from "../dtos/SignUpRequestDto";
import { SignUpResponseDto } from "../dtos/SignUpResponseDto";
import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError";
import { PasswordEncoder } from "../password_encoder/PasswordEncoder";
import { TokenEncoder } from "../token_encoder/TokenEncoder";

export class SignUpUseCase {
  private readonly userRepository: IUserRepository;
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

  async execute(userData: SignUpRequestDto): Promise<SignUpResponseDto> {
    const { email, password, firstName, lastName } = userData;
    const user = new User(email, password, firstName, lastName);
    user.setPassword(await this.passwordEncoder.encode(password));

    if (await this.userRepository.retrieveOne(email)) {
      throw new UserAlreadyExistsError("User already exists");
    }

    const createdUser = await this.userRepository.add(user);
    return {
      token: await this.jwtEncoder.encode({
        email: createdUser.email,
      }),
      user: {
        email: createdUser.email,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
      },
    };
  }
}
