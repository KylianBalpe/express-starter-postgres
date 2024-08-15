import { User } from "@prisma/client";

export type AuthResponse = {
  email: string;
  first_name: string;
  last_name?: string;
  access_token?: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  first_name: string;
  last_name?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const toAuthResponse = (user: User): AuthResponse => {
  return {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name || undefined,
  };
};
