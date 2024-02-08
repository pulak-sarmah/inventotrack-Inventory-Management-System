import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.middleware";
import { asyncHandler } from "./utils/asyncHandler";
import { ApiResponse } from "./utils/ApiResponse";

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
import productRouter from "./routes/product.route";
import contactRouter from "./routes/contact.route";

//use routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/contact-us", contactRouter);

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
