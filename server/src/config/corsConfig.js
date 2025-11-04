import cors from "cors";

export const configureCors = () => {
  return cors({
    origin: "*", // allow requests from any domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
    credentials: false, // must be false when origin is '*'
    preflightContinue: false,
    maxAge: 600,
    optionsSuccessStatus: 204,
  });
};
