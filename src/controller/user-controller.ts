import { UserRequest } from "@/type/user-request";
import { NextFunction, Response } from "express";
import { UserService } from "@/service/user-service";
import { ResponseJson } from "@/response/response";

export class UserController {
  static async profile(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await UserService.profile(req.user!);
      const apiResponse = new ResponseJson(
        "success",
        200,
        "User profile retrieved successfully",
        response,
      );
      res.status(200).json(apiResponse.toJson());
    } catch (e) {
      next(e);
    }
  }
}
