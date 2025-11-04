import express from "express";
import { getAllVillages } from "../controllers/village.controller.js";

const villageRouter = express.Router();

villageRouter.get("/", getAllVillages);

export default villageRouter;
