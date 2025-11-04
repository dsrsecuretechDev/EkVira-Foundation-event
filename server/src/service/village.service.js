// services/village.service.js
import Village from "../models/village.model.js";

/**
 * Fetch all villages from the database.
 * @returns {Promise<Array>} List of villages
 */
export const getAllVillagesService = async () => {
  try {
    const villages = await Village.find().sort({ village_name_en: 1 });
    return villages;
  } catch (error) {
    console.error("Error fetching villages:", error);
    throw new Error("Failed to fetch villages from database.");
  }
};
