import { User } from "@prisma/client";
import { toUserResponse, UserResponse } from "@/model/user-model";
import { prismaClient } from "@/application/database";
import { ResponseError } from "@/response/response";

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
}
