import express from "express";
import { UserController } from "@/controller/user-controller";

export const userRoute = express.Router();
userRoute.post("/v1/user", UserController.register);
