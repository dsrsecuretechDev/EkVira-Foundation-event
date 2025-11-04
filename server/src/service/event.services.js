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

// 🟣 Get All Users (with pagination + search)
// export const getEventService = async (page = 1, limit = 10, search = "") => {
//   const skip = (page - 1) * limit;
//   const filter = {};

//   if (search) {
//     filter.$or = [
//       { fullName: { $regex: search, $options: "i" } },
//       { mobileNumber: { $regex: search, $options: "i" } },
//       { village: { $regex: search, $options: "i" } },
//       { coordinatorName: { $regex: search, $options: "i" } },
//     ];
//   }

//   const totalEvent = await Event.countDocuments(filter);
//   const events = await Event.find(filter)
//     .skip(skip)
//     .limit(limit)
//     .sort({ createdAt: -1 });

//   return {
//     page,
//     limit,
//     totalPages: Math.ceil(totalEvent / limit),
//     totalEvent,
//     events,
//   };
// };

export const getEventService = async (page = 1, limit = 10, search = "") => {
  const skip = (page - 1) * limit;
  const filter = {};

  // 🧠 Build search filter
  if (search) {
    const regex = new RegExp(search, "i");

    // Try to search by ObjectId if valid
    if (mongoose.Types.ObjectId.isValid(search)) {
      filter.$or = [{ village: search }];
    } else {
      filter.$or = [
        { fullName: regex },
        { mobileNumber: regex },
        { coordinatorName: regex },
        // We’ll handle village name search separately using aggregation
      ];
    }
  }

  // 🧮 Get total count first
  const totalEvent = await Event.countDocuments(filter);

  // 🧾 Fetch events with populated village
  const events = await Event.find(filter)
    .populate("village", "village_name_mr")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: 1 });

  // 📊 Return structured response
  return {
    page,
    limit,
    totalPages: Math.ceil(totalEvent / limit),
    totalEvent,
    events: events.map((event) => ({
      _id: event._id,
      fullName: event.fullName,
      mobileNumber: event.mobileNumber,
      address: event.address,
      sectionName: event.sectionName,
      birthDate: event.birthDate,
      instagramId: event.instagramId,
      coordinatorName: event.coordinatorName,
      createdAt: event.createdAt,
      // 🏷️ Include village info
      village: event?.village.village_name_mr,
    })),
  };
};
