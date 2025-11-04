import express from "express";
import {
  createEventController,
  getEvent,
} from "../controllers/event.controller.js";
import {
  downloadFilteredEventsController,
  exportEvent,
} from "../controllers/eventExcle.controller.js";

const eventRouter = express.Router();

eventRouter.post("/", createEventController);

eventRouter.get("/", getEvent);

eventRouter.get("/excel", exportEvent);

eventRouter.get("/sort-excel", downloadFilteredEventsController);

export default eventRouter;
