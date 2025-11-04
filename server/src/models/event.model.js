import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^\d{10}$/,
    },
    villageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Village",
      required: true,
    },
    address: {
      type: String,
      required: false,
      trim: true,
    },
    sectionName: {
      type: String,
      trim: true,
    },
    birthDate: {
      type: Date,
      required: false,
    },
    instagramId: {
      type: String,
      required: false,
      trim: true,
    },
    coordinatorName: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const Event = mongoose.model("Event", EventSchema);

export default Event;
