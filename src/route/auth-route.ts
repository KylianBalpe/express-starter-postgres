import express from "express";
import { AuthController } from "@/controller/auth-controller";

export const authRoute = express.Router();
authRoute.post("/v1/register", AuthController.register);
authRoute.post("/v1/login", AuthController.login);
