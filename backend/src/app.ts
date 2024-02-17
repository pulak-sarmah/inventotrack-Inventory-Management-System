import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
// import cors from "cors";
import errorHandler from "./middleware/errorHandler.middleware";
// import rateLimit from "express-rate-limit";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: "32kb" }));

// app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../build")));

// //rate limiter
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 400,
// });

// app.use("/api", limiter);

//import routes
import userRouter from "./routes/user.route";
import productRouter from "./routes/product.route";
import contactRouter from "./routes/contact.route";

//use routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/contact-us", contactRouter);

// //status check
// app.get(
//   "/",
//   asyncHandler(async (_, res) => {
//     res.status(200).json(new ApiResponse(200, true, "Server is running"));
//   })
// );

// Handle unmatched routes and serve index.html file
// app.get(
//   "*",
//   asyncHandler(async (req, res) => {
//     res.sendFile(path.resolve(__dirname, "build", "index.html"));
//   })
// );

//error handler
app.use(errorHandler);

export default app;
