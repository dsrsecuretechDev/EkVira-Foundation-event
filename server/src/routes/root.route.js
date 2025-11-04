import express from "express";
import userRouter from "./user.route.js";
import eventRouter from "./event.routes.js";
import villageRouter from "./village.routes.js";

const rootRouter = express.Router();
// auth routes
rootRouter.use("/auth", userRouter);
// event routes
rootRouter.use("/event", eventRouter);

rootRouter.use("/villages", villageRouter);

export default rootRouter;
