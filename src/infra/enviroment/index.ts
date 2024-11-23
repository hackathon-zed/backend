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
  GROQ_API_KEY,
  AZURE_OCR_API_KEY,
  AZURE_OCR_ENDPOINT,
  AZURE_OCR_REGION,
  AZURE_SPEECH_TO_TEXT_API_KEY,
  AZURE_SPEECH_TO_TEXT_ENDPOINT,
  AZURE_SPEECH_TO_TEXT_REGION
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
  },

  azure: {
    ocr: {
      apiKey: AZURE_OCR_API_KEY,
      endpoint: AZURE_OCR_ENDPOINT,
      region: AZURE_OCR_REGION
    },
    speechtotext: {
      apiKey: AZURE_SPEECH_TO_TEXT_API_KEY,
      endpoint: AZURE_SPEECH_TO_TEXT_ENDPOINT,
      region: AZURE_SPEECH_TO_TEXT_REGION
    }
  }


} as IEnviroment;
