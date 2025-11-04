import ExcelJS from "exceljs";
import fs from "fs";
import Event from "../models/event.model.js";

export const exportToExcelService = async () => {
  const data = await Event.find();

  if (!data.length) {
    throw new Error("No Event data found");
  }

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("events");

  // Define headers
  sheet.columns = [
    { header: "Full Name", key: "fullName", width: 25 },
    { header: "Mobile Number", key: "mobileNumber", width: 15 },
    { header: "Village", key: "village", width: 20 },
    { header: "Address", key: "address", width: 30 },
    { header: "Section Name", key: "sectionName", width: 15 },
    { header: "Birth Date", key: "birthDate", width: 15 },
    { header: "Instagram ID", key: "instagramId", width: 20 },
    { header: "Coordinator Name", key: "coordinatorName", width: 20 },
    { header: "Created At", key: "createdAt", width: 25 },
  ];

  // Add rows
  data.forEach((item) => {
    sheet.addRow({
      fullName: item.fullName,
      mobileNumber: item.mobileNumber,
      village: item.village,
      address: item.address,
      sectionName: item.sectionName || "",
      birthDate: item.birthDate
        ? new Date(item.birthDate).toLocaleDateString("en-IN")
        : "",
      instagramId: item.instagramId || "",
      coordinatorName: item.coordinatorName || "",
      createdAt: new Date(item.createdAt).toLocaleString("en-IN"),
    });
  });

  const exportDir = "./exports";
  if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir);

  const filePath = `${exportDir}/Registrations_${Date.now()}.xlsx`;
  await workbook.xlsx.writeFile(filePath);

  return filePath;
};
