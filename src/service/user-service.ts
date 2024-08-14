import {
  RegisterRequest,
  toUserResponse,
  UserResponse,
} from "@/model/user-model";
import { Validation } from "@/validation/validation";
import { UserValidation } from "@/validation/user-validation";
import { prismaClient } from "@/application/database";
import bcrypt from "bcrypt";
import { ResponseError } from "@/response/response";

export class UserService {
  static async register(request: RegisterRequest): Promise<UserResponse> {
    const registerRequest: RegisterRequest = Validation.validate(
      UserValidation.REGISTER,
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

    return toUserResponse(user);
  }
}
