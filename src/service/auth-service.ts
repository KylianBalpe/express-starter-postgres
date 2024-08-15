import {
  LoginRequest,
  RegisterRequest,
  toAuthResponse,
  AuthResponse,
} from "@/model/auth-model";
import { Validation } from "@/validation/validation";
import { AuthValidation } from "@/validation/auth-validation";
import { prismaClient } from "@/application/database";
import bcrypt from "bcrypt";
import { ResponseError } from "@/response/response";
import jwt from "jsonwebtoken";

export class AuthService {
  static async register(request: RegisterRequest): Promise<AuthResponse> {
    const registerRequest: RegisterRequest = Validation.validate(
      AuthValidation.REGISTER,
      request,
    );

    const isEmailExist = await prismaClient.user.findUnique({
      where: {
        email: registerRequest.email,
      },
    });

    if (isEmailExist) {
      throw new ResponseError("error", 400, "Email already exist");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: registerRequest,
    });

    return toAuthResponse(user);
  }

  static async login(request: LoginRequest): Promise<AuthResponse> {
    const loginRequest: LoginRequest = Validation.validate(
      AuthValidation.LOGIN,
      request,
    );

    const user = await prismaClient.user.findUnique({
      where: {
        email: loginRequest.email,
      },
    });

    if (!user) {
      throw new ResponseError("error", 400, "Invalid email or password");
    }

    const isPasswordMatch = await bcrypt.compare(
      loginRequest.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new ResponseError("error", 400, "Invalid email or password");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });

    const response = toAuthResponse(user);
    response.access_token = token;
    return response;
  }
}
