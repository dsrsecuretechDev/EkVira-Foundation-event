import express from "express";
import { createEventController } from "../controllers/event.controller.js";

const eventRouter = express.Router();

eventRouter.post("/", createEventController);

export default eventRouter;
