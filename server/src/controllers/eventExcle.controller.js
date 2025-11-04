import { exportFilteredEventsService, exportToExcelService } from "../service/eventExcle.service.js";

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

export const downloadFilteredEventsController = async (req, res) => {
  try {
    const { search = "" } = req.query;
    const buffer = await exportFilteredEventsService(search);

    const fileName = search
      ? `Filtered_Events_${search}_${Date.now()}.xlsx`
      : `All_Events_${Date.now()}.xlsx`;

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(fileName)}"`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
  } catch (error) {
    console.error("❌ Error exporting Excel:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to export data to Excel",
    });
  }
};
