import mongoose from "mongoose";

const VillageSchema = new mongoose.Schema(
  {
    village_name_mr: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    village_name_en: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const village = mongoose.model("Village", VillageSchema);

export default village;
