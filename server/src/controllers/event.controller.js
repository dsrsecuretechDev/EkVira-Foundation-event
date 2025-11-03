
import { createEvent, getEventService } from "../service/event.services.js";
import ErrorHandler from "../utils/ErrorHandler.js";

/**
 * Handles the POST request to /api/users to create a new user.
 * Expects: fullName, mobileNumber, address, b-date, instagramId in req.body
 */
export const createEventController = async (req, res, next) => {
  // Extract the user data directly from the request body
  const eventData = req.body;

  // Basic validation check
  if (!eventData.fullName || !eventData.mobileNumber) {
    return next(
      new ErrorHandler(
        "Missing required fields: fullName and mobileNumber are mandatory.",
        400
      )
    );
  }

  try {
    const newUser = await createEvent(eventData);

    // Respond with a 201 Created status and the new user data
    return res.status(201).json({
      message: "User created successfully!",
      data: newUser,
    });
  } catch (error) {
    // Handle MongoDB specific errors (e.g., unique constraint violation for mobileNumber)
    if (error.code === 11000) {
      return next(
        new ErrorHandler("A user with this mobile number already exists.", 409)
      );
    }

    // Handle validation errors from Mongoose
    if (error.name === "ValidationError") {
      return next(new ErrorHandler(`Validation failed: ${error.message}`, 400));
    }

    // Handle other server errors
    console.error("Server Error creating user:", error);
    return next(new ErrorHandler("Internal Server Error", 500));
  }
};



export const getEvent = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const result = await getEventService(page, limit, search);

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch users",
    });
  }
};