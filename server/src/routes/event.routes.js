import express from "express";
import {
  createEventController,
  getEvent,
} from "../controllers/event.controller.js";

const eventRouter = express.Router();

eventRouter.post("/", createEventController);

eventRouter.get("/", getEvent);

export default eventRouter;
