import cors from "cors";

export const configureCors = () => {
  return cors({
    origin: (origin, callback) => {
      const allowedOrigins = process.env.ORIGIN;

      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], // allowed only this method
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
    credentials: true, //
    preflightContinue: false,
    maxAge: 600,
    optionsSuccessStatus: 204,
  });
};
