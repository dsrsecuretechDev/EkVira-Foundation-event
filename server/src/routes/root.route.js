import express from "express";
import userRouter from "./user.route.js";
import eventRouter from "./event.routes.js";

const rootRouter = express.Router();
// auth routes
rootRouter.use("/auth", userRouter);
// event routes
rootRouter.use("/event", eventRouter);

export default rootRouter;
