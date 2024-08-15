import { NextFunction, Request, Response } from "express";
import { LoginRequest, RegisterRequest } from "@/model/auth-model";
import { AuthService } from "@/service/auth-service";
import { ResponseJson } from "@/response/response";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RegisterRequest = req.body as RegisterRequest;
      const response = await AuthService.register(request);
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

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginRequest = req.body as LoginRequest;
      const response = await AuthService.login(request);
      const apiResponse = new ResponseJson(
        "success",
        200,
        "User logged in successfully",
        response,
      );
      res.status(200).json(apiResponse.toJson());
    } catch (e) {
      next(e);
    }
  }
}
