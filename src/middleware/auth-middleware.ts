import { UserRequest } from "@/type/user-request";
import { NextFunction, Response } from "express";
import { ResponseError } from "@/response/response";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export async function authMiddleware(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new ResponseError("error", 401, "Unauthorized");
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      throw new ResponseError("error", 401, "Unauthorized");
    }

    req.user = user as User;
    next();
  });
}
