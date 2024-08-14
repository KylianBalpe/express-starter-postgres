import { NextFunction, Request, Response } from "express";
import { RegisterRequest } from "@/model/user-model";
import { UserService } from "@/service/user-service";
import { ResponseJson } from "@/response/response";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RegisterRequest = req.body as RegisterRequest;
      const response = await UserService.register(request);
      const apiResponse = new ResponseJson(
        "success",
        201,
        "User registered successfully",
        response,
      );
      res.status(201).json(apiResponse.toJson());
    } catch (e) {
      next(e);
    }
  }
}
