import { getAllVillagesService } from "../service/village.service.js";

/**
 * @desc Get all villages
 * @route GET /api/villages
 * @access Public
 */
export const getAllVillages = async (req, res) => {
  try {
    const villages = await getAllVillagesService();
    if (!villages || villages.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No villages found",
      });
    }

    res.status(200).json({
      success: true,
      count: villages.length,
      data: villages,
    });
  } catch (error) {
    console.error("❌ Error in getAllVillages:", error.message);

    res.status(500).json({
      success: false,
      message: "Server error while fetching villages.",
      error: error.message,
    });
  }
};
