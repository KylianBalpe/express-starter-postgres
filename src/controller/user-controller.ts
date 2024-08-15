import { UserRequest } from "@/type/user-request";
import { NextFunction, Response } from "express";
import { UserService } from "@/service/user-service";
import { ResponseJson } from "@/response/response";
import { UpdateUserRequest } from "@/model/user-model";

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

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      const response = await UserService.update(req.user!, request);
      const apiResponse = new ResponseJson(
        "success",
        200,
        "User profile updated successfully",
        response,
      );
      res.status(200).json(apiResponse.toJson());
    } catch (e) {
      next(e);
    }
  }
}
