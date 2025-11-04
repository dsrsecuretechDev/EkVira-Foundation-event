import { exportToExcelService } from "../service/eventExcle.service.js";


export const exportEvent = async (req, res) => {
  try {
    const filePath = await exportToExcelService();
    console.log(`📦 Excel exported: ${filePath}`);

    res.download(filePath, (err) => {
      if (err) {
        console.error("❌ Download error:", err);
        res.status(500).json({ message: "Error downloading file" });
      }
    });
  } catch (error) {
    console.error("❌ Error exporting data:", error.message);
    res.status(500).json({ message: error.message });
  }
};
