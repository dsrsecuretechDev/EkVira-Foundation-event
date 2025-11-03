import dotenv from "dotenv";
import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import ejs from "ejs";
import path, { dirname } from "path";
import sendMail from "../utils/sendMail.js";
import { createActivationToken } from "../utils/createActivationToken.js";
import {
  activateUserSchema,
  loginUserSchema,
  registerSchema,
} from "../validations/user.validations.js";
import { fileURLToPath } from "url";
import { logger } from "../utils/logger.js";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt.js";

dotenv.config();

export const registrationsUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Pass the data to the validation.
    const { error } = registerSchema.validate(req.body, { abortEarly: false });

    // If any validation error occurs then return error
    if (error) {
      // Pass validation errors to the error handler
      return next(new ErrorHandler(error, 400));
    }

    // Check the mail exist or not
    const isEmailExist = await userModel.findOne({ email });

    // If it is exist then return
    if (isEmailExist) {
      return next(new ErrorHandler("Email already exist", 400));
    }

    const user = {
      name,
      email,
      password,
    };

    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;
    const data = { user: { name: user.name }, activationCode };

    const __dirname = dirname(fileURLToPath(import.meta.url));

    const html = await ejs.renderFile(
      path.join(__dirname, "../mails/activation-mail.ejs"),
      data
    );

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account ...",
        template: "activation-mail.ejs",
        data,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email: ${user.email} to activate your account`,
        activationToken: activationToken.token,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  } catch (error) {
    logger.error(error.message);
    return next(new ErrorHandler(error.message, 400));
  }
});

// activate user

export const activateUser = CatchAsyncError(async (req, res, next) => {
  try {
    // Pass the data to the validation.
    const { error } = activateUserSchema.validate(req.body, {
      abortEarly: false,
    });

    // If any validation error occurs then return error
    if (error) {
      // Pass validation errors to the error handler
      return next(
        new ErrorHandler(
          error.details.map((err) => err.message).join(", "),
          400
        )
      );
    }

    const { activation_code, activation_token } = req.body;

    console.log(process.env.ACTIVATION_SECRET);

    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    console.log(newUser);

    if (newUser.activationCode !== activation_code) {
      return new ErrorHandler("Invalid Activation Code", 400);
    }

    const { name, email, password } = newUser.user;

    // check the email is already exits or not
    const existUser = await userModel.findOne({ email });

    if (existUser) {
      return new ErrorHandler("Email already exist", 400);
    }

    const user = await userModel.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    return new ErrorHandler("error.message", 400);
  }
});

// login user
export const loginUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { error } = loginUserSchema.validate(req.body, {
      abortEarly: false,
    });

    // If any validation error occurs then return error
    if (error) {
      // Pass validation errors to the error handler
      return next(
        new ErrorHandler(
          error.details.map((err) => err.message).join(", "),
          400
        )
      );
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await userModel.findOne({ email }).select("+password");
    console.log(user);

    if (!user) {
      return next(new ErrorHandler("Invalid user name or password", 400));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid user name or password", 400));
    }

    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// logout User
export const logoutUser = CatchAsyncError(async (req, res, next) => {
  try {
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });
    const userId = req.user?._id || "";
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 400));
  }
});

// update access token.
export const updateAccessToken = CatchAsyncError(async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);

    const message = "Could not refresh token";
    if (!decoded) {
      return next(new ErrorHandler(message, 400));
    }

    if (!session) {
      return next(new ErrorHandler(message, 400));
    }

    const user = JSON.parse(session);

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "5m",
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
      expiresIn: "3d",
    });

    req.user = user;

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token ", refreshToken, refreshTokenOptions);

    res.status(200).json({
      status: "success",
      accessToken,
    });
  } catch (error) {
    logger.error(error.message);
    return next(new ErrorHandler(error.message, 400));
  }
});
