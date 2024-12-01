import { UserProps } from "../../domain/entities/User";

export type SignInResponseDto = {
  token: string;
  user: Pick<UserProps, "email" | "firstName" | "lastName">;
};
