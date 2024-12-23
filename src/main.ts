import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";

import { ApiError } from "./errors/apiError";
import { userRouter } from "./routers/user.router";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception", error);
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

// CRUD
// Create - POST
// Read - GET
// Update - PUT
// Delete - Delete

const port = process.env.PORT;
app.listen(3000, () => {
  console.log(`Server has benn started on port ${port}`);
});
