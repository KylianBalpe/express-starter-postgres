import express, { Request, Response } from "express";
import cors from "cors";
import { errorMiddleware } from "@/middleware/error-middleware";
import { authRoute } from "@/route/auth-route";
import { userRoute } from "@/route/user-route";

export const app = express();

app.use(express.json());
app.use(cors());

app.use(authRoute);
app.use(userRoute);

app.use(errorMiddleware);

let message = "";
if (process.env.NODE_ENV === "development") {
  message = "Hello from development!";
} else if (process.env.NODE_ENV === "production") {
  message = "Hello from production!";
}

app.use("/v1", (req: Request, res: Response) => {
  res.status(200).send({
    status: "success",
    code: 200,
    message: message,
  });
});
