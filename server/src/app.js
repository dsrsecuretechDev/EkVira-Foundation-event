import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error.js";
import userRouter from "./routes/user.route.js";
import { configureCors } from "./config/corsConfig.js";
import { logger } from "./utils/logger.js";
import rootRouter from "./routes/root.route.js";

dotenv.config();
export const app = express();

app.use(configureCors()); // cors (cross origin resource sharing)
app.use(express.json());

// cookie parser
app.use(cookieParser());

// Request Logger Middleware
app.use((req, res, next) => {
  logger.info(
    `Request ${req.method} - ${req.originalUrl} - ${req.ip} - ${new Date()}`
  );
  logger.info(`Body: ${JSON.stringify(req.body)}`);

  next();
});

// Routers
app.use("/api/v1", rootRouter);

// test api
app.use("/test", (req, res, next) => {
  logger.info("✅ API is working ");
  res.status(200).json({
    success: true,
    message: "✅  API is Working",
  });
});

app.use("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} Not Found`);
  err.statusCode = 404;
  logger.error(`Route ${req.originalUrl} Not Found`);
  next(err);
});

app.use(ErrorMiddleware);
