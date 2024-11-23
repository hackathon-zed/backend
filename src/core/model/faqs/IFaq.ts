import { Types } from "mongoose";

export interface IFaq {
  _id: Types.ObjectId; // MongoDB ObjectId
  question: string;
  answer: string;
}
