import { IEnviroment } from "./IEnviroment.";
import * as dotenv from "dotenv";

dotenv.config();

const { 
  PORT,
  NODE_ENV,
  CORS_ORIGIN,
  SESSION_SECRET,
  MONGO_URI,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  GROQ_API_KEY
} = process.env;

export const enviroment: IEnviroment = {
  port: Number(PORT),
  corsOrigin: CORS_ORIGIN,
  sessionSecret: SESSION_SECRET,
  development: NODE_ENV === "development",
  production: NODE_ENV === "production",
  mongoUrl: MONGO_URI,
  oauth: {
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackUrl: GOOGLE_CALLBACK_URL
  },
  groq: {
    apiKey: GROQ_API_KEY
  }

} as IEnviroment;
