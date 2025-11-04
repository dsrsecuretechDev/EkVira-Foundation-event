import mongoose from "mongoose";
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

export const getEventService = async (page = 1, limit = 10, search = "") => {
  const skip = (page - 1) * limit;
  const regex = new RegExp(search, "i");

  // 🧮 Aggregation pipeline
  const pipeline = [
    {
      $lookup: {
        from: "villages", // collection name in MongoDB
        localField: "village",
        foreignField: "_id",
        as: "villageData",
      },
    },
    { $unwind: { path: "$villageData", preserveNullAndEmptyArrays: true } },
  ];

  // 🧠 Build dynamic search
  if (search) {
    const matchStage = {
      $or: [
        { fullName: regex },
        { mobileNumber: regex },
        { coordinatorName: regex },
        { "villageData.village_name_mr": regex },
        { "villageData.village_name_en": regex },
      ],
    };
    pipeline.push({ $match: matchStage });
  }

  // 🧾 Sort oldest → newest (as you wanted)
  pipeline.push({ $sort: { createdAt: 1 } });

  // 🧮 Pagination
  pipeline.push({ $skip: skip }, { $limit: limit });

  // 🧩 Execute aggregation
  const events = await Event.aggregate(pipeline);

  // 🧮 Get total count (without pagination)
  const countPipeline = pipeline.filter(
    (stage) => !("$skip" in stage || "$limit" in stage)
  );
  countPipeline.push({ $count: "total" });

  const countResult = await Event.aggregate(countPipeline);
  const totalEvent = countResult[0]?.total || 0;

  // 📊 Format response
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
      village: event.villageData?.village_name_mr || "—",
    })),
  };
};
