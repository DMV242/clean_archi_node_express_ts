import { UserProps } from "../../domain/entities/User";

export type SignUpResponseDto = {
  token: string;
  user: Pick<UserProps, "email" | "firstName" | "lastName">;
};
