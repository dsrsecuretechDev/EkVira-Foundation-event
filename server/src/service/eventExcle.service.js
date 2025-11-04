import ExcelJS from "exceljs";
import fs from "fs";
import Event from "../models/event.model.js";

// export const exportToExcelService = async () => {
//   const data = await Event.find();

//   if (!data.length) {
//     throw new Error("No Event data found");
//   }

//   const workbook = new ExcelJS.Workbook();
//   const sheet = workbook.addWorksheet("events");

//   // Define headers
//   sheet.columns = [
//     { header: "Full Name", key: "fullName", width: 25 },
//     { header: "Mobile Number", key: "mobileNumber", width: 15 },
//     { header: "Village", key: "village", width: 20 },
//     { header: "Address", key: "address", width: 30 },
//     { header: "Section Name", key: "sectionName", width: 15 },
//     { header: "Birth Date", key: "birthDate", width: 15 },
//     { header: "Instagram ID", key: "instagramId", width: 20 },
//     { header: "Coordinator Name", key: "coordinatorName", width: 20 },
//     { header: "Created At", key: "createdAt", width: 25 },
//   ];

//   // Add rows
//   data.forEach((item) => {
//     sheet.addRow({
//       fullName: item.fullName,
//       mobileNumber: item.mobileNumber,
//       village: item.village,
//       address: item.address,
//       sectionName: item.sectionName || "",
//       birthDate: item.birthDate
//         ? new Date(item.birthDate).toLocaleDateString("en-IN")
//         : "",
//       instagramId: item.instagramId || "",
//       coordinatorName: item.coordinatorName || "",
//       createdAt: new Date(item.createdAt).toLocaleString("en-IN"),
//     });
//   });

//   const exportDir = "./exports";
//   if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir);

//   const filePath = `${exportDir}/Registrations_${Date.now()}.xlsx`;
//   await workbook.xlsx.writeFile(filePath);

//   return filePath;
// };

export const exportToExcelService = async () => {
  // 🧩 Fetch all events with populated village (Marathi name)
  const data = await Event.find().populate("village", "village_name_mr");

  if (!data.length) {
    throw new Error("No Event data found");
  }

  // 📘 Create workbook & worksheet
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Events");

  // 🧾 Define Excel columns
  sheet.columns = [
    { header: "Full Name", key: "fullName", width: 25 },
    { header: "Mobile Number", key: "mobileNumber", width: 15 },
    { header: "Village (Marathi)", key: "village", width: 25 },
    { header: "Address", key: "address", width: 30 },
    { header: "Section Name", key: "sectionName", width: 15 },
    { header: "Birth Date", key: "birthDate", width: 15 },
    { header: "Instagram ID", key: "instagramId", width: 20 },
    { header: "Coordinator Name", key: "coordinatorName", width: 20 },
    { header: "Created At", key: "createdAt", width: 25 },
  ];

  // 🧮 Add each event as a row
  data.forEach((item) => {
    sheet.addRow({
      fullName: item.fullName,
      mobileNumber: item.mobileNumber,
      village: item.village?.village_name_mr || "—",
      address: item.address || "",
      sectionName: item.sectionName || "",
      birthDate: item.birthDate
        ? new Date(item.birthDate).toLocaleDateString("en-IN")
        : "",
      instagramId: item.instagramId || "",
      coordinatorName: item.coordinatorName || "",
      createdAt: new Date(item.createdAt).toLocaleString("en-IN"),
    });
  });

  // 🎨 Optional: Bold header row
  sheet.getRow(1).font = { bold: true };

  // 💾 Ensure export directory exists
  const exportDir = "./exports";
  if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir);

  // 📂 Create file name and save
  const filePath = `${exportDir}/Event_${Date.now()}.xlsx`;
  await workbook.xlsx.writeFile(filePath);

  return filePath;
};

export const exportToExcelSortService = async () => {
  // 🧩 Fetch all events with populated village (Marathi name)
  const data = await Event.find().populate("village", "village_name_mr");

  if (!data.length) {
    throw new Error("No Event data found");
  }

  // 📘 Create workbook & worksheet
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Events");

  // 🧾 Define Excel columns
  sheet.columns = [
    { header: "Full Name", key: "fullName", width: 25 },
    { header: "Mobile Number", key: "mobileNumber", width: 15 },
    { header: "Village (Marathi)", key: "village", width: 25 },
    { header: "Address", key: "address", width: 30 },
    { header: "Section Name", key: "sectionName", width: 15 },
    { header: "Birth Date", key: "birthDate", width: 15 },
    { header: "Instagram ID", key: "instagramId", width: 20 },
    { header: "Coordinator Name", key: "coordinatorName", width: 20 },
    { header: "Created At", key: "createdAt", width: 25 },
  ];

  // 🧮 Add each event as a row
  data.forEach((item) => {
    sheet.addRow({
      fullName: item.fullName,
      mobileNumber: item.mobileNumber,
      village: item.village?.village_name_mr || "—",
      address: item.address || "",
      sectionName: item.sectionName || "",
      birthDate: item.birthDate
        ? new Date(item.birthDate).toLocaleDateString("en-IN")
        : "",
      instagramId: item.instagramId || "",
      coordinatorName: item.coordinatorName || "",
      createdAt: new Date(item.createdAt).toLocaleString("en-IN"),
    });
  });

  // 🎨 Optional: Bold header row
  sheet.getRow(1).font = { bold: true };

  // 💾 Ensure export directory exists
  const exportDir = "./exports";
  if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir);

  // 📂 Create file name and save
  const filePath = `${exportDir}/Event_${Date.now()}.xlsx`;
  await workbook.xlsx.writeFile(filePath);

  return filePath;
};


export const exportFilteredEventsService = async (search = "") => {
  const regex = new RegExp(search, "i");

  const pipeline = [
    {
      $lookup: {
        from: "villages",
        localField: "village",
        foreignField: "_id",
        as: "villageData",
      },
    },
    { $unwind: { path: "$villageData", preserveNullAndEmptyArrays: true } },
  ];

  // Apply search if provided
  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { fullName: regex },
          { mobileNumber: regex },
          { address: regex },
          { "villageData.village_name_mr": regex },
          { "villageData.village_name_en": regex },
        ],
      },
    });
  }

  // Sort oldest first
  pipeline.push({ $sort: { createdAt: 1 } });

  const events = await Event.aggregate(pipeline);
  if (!events.length) {
    throw new Error("No matching records found");
  }

  // 🧾 Create Excel workbook
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Filtered Events");

  // Define columns
  sheet.columns = [
    { header: "Full Name", key: "fullName", width: 25 },
    { header: "Mobile Number", key: "mobileNumber", width: 15 },
    { header: "Village", key: "village", width: 25 },
    { header: "Address", key: "address", width: 30 },
    { header: "Section Name", key: "sectionName", width: 15 },
    { header: "Birth Date", key: "birthDate", width: 15 },
    { header: "Instagram ID", key: "instagramId", width: 20 },
    { header: "Coordinator Name", key: "coordinatorName", width: 20 },
    { header: "Created At", key: "createdAt", width: 25 },
  ];

  // Add rows
  events.forEach((item) => {
    sheet.addRow({
      fullName: item.fullName,
      mobileNumber: item.mobileNumber,
      village: item.villageData?.village_name_mr || "—",
      address: item.address || "",
      sectionName: item.sectionName || "",
      birthDate: item.birthDate
        ? new Date(item.birthDate).toLocaleDateString("en-IN")
        : "",
      instagramId: item.instagramId || "",
      coordinatorName: item.coordinatorName || "",
      createdAt: new Date(item.createdAt).toLocaleString("en-IN"),
    });
  });

  // ✅ Style the header
  sheet.getRow(1).font = { bold: true };
  sheet.getRow(1).alignment = { horizontal: "center" };

  // Return buffer for download
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
};