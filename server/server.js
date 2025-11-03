import { app } from "./src/app.js";
import connectDB from "./src/utils/db.js";
import dotenv from "dotenv";
dotenv.config();

// create a server
app.listen(process.env.PORT, () => {
  console.log(`✅ Server is connected with port :${process.env.PORT}`);
  connectDB();
});
