import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import { ApiError } from "./errors/apiError";
import { userRouter } from "./routers/user.router";
import { authRouter } from "./routers/auth.router";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/users", userRouter);

process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
});

app.use(
  "*",
  (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    const status = error.status ?? 500;
    const message = error.message ?? "Something went wrong";
    res.status(status).json({ status, message });
  },
);

app.listen(config.port, async () => {
  await mongoose.connect(config.mongoUri);
  console.log(`Server has benn started on port ${config.port}`);
});
