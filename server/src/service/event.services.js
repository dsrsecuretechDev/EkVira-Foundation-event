import Event from "../models/event.model.js";

/**
 * Creates a new user document in the database.
 * @param {object} eventData - The data for the new user.
 * @returns {Promise<Event>} The created user document.
 */
export const createEvent = async (eventData) => {
  try {
    // Use the spread operator to pass all fields from the controller
    const newEvent = await Event.create(eventData);
    // The .toObject() method converts the Mongoose Document to a plain JavaScript object
    return newEvent.toObject();
  } catch (error) {
    // Re-throw the error so the controller can handle the HTTP response
    console.error("Error in userService.createUser:", error);
    throw error;
  }
};
