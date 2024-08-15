import express from "express";
import { UserController } from "@/controller/user-controller";
import { authMiddleware } from "@/middleware/auth-middleware";

export const userRoute = express.Router();
userRoute.get("/v1/profile", authMiddleware, UserController.profile);
userRoute.patch("/v1/profile", authMiddleware, UserController.update);
