import { CatchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import jwt from "jsonwebtoken";

// authenticated User
export const isAuthenticated = CatchAsyncError(async (req, res, next) => {
  const access_token = req.cookies.access_token;

  console.log(access_token);

  if (!access_token) {
    return next(new ErrorHandler("Please login to access this resources", 400));
  }

  const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN);

  if (!decoded) {
    return next(new ErrorHandler("Access token is not valid ", 400));
  }

  req.user = JSON.parse(user);
  next();
});

// validate user role
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log(req.user?.role);

    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Role: ${req.user?.role} is not allow to access this resource `,
          403
        )
      );
    }
    next();
  };
};
