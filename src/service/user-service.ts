import { User } from "@prisma/client";
import {
  toUserResponse,
  UpdateUserRequest,
  UserResponse,
} from "@/model/user-model";
import { prismaClient } from "@/application/database";
import { ResponseError } from "@/response/response";
import { Validation } from "@/validation/validation";
import { UserValidation } from "@/validation/user-validation";

export class UserService {
  static async profile(user: User): Promise<UserResponse> {
    const response = await prismaClient.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!response) {
      throw new ResponseError("error", 404, "User not found");
    }

    return toUserResponse(response);
  }

  static async update(
    user: User,
    request: UpdateUserRequest,
  ): Promise<UserResponse> {
    const updateRequest: UpdateUserRequest = Validation.validate(
      UserValidation.UPDATE,
      request,
    );

    const isUserExist = await prismaClient.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!isUserExist) {
      throw new ResponseError("error", 404, "User not found");
    }

    const updateUser = await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: updateRequest,
    });

    const response = toUserResponse(updateUser);

    if (updateUser.first_name) {
      response.first_name = updateUser.first_name;
    }

    if (updateUser.last_name) {
      response.last_name = updateUser.last_name;
    }

    return response;
  }
}
