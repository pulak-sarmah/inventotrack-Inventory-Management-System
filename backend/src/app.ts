import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.middleware";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: "32kb" }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.static("public"));
app.use(cookieParser());

//import routes
import userRouter from "./routes/user.route";
import { asyncHandler } from "./utils/asyncHandler";
import { ApiResponse } from "./utils/ApiResponse";

//use routes
app.use("/api/v1/users", userRouter);

//status check
app.get(
  "/api/v1/status",
  asyncHandler(async (_, res) => {
    res.status(200).json(new ApiResponse(200, true, "Server is running"));
  })
);

//error handler
app.use(errorHandler);

export default app;
