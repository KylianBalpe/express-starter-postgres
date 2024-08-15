import { User } from "@prisma/client";

export type UserResponse = {
  id: number;
  email: string;
  first_name: string;
  last_name?: string;
};

export type UpdateUserRequest = {
  first_name?: string;
  last_name?: string;
};

export const toUserResponse = (user: User): UserResponse => {
  return {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name || undefined,
  };
};
