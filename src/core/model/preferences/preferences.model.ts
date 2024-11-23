import { IPreferences } from "./IPrefences.types";
import { Schema, model } from "mongoose";

export const PreferencesSchema = new Schema<IPreferences>({
    communicationMethod: {
        type: String,
        required: true,
        enum: ['email', 'sms', 'phone'],
        default: 'email'
    },
    notificationPreferences: {
        orderUpdates: {
            type: Boolean,
            default: true
        },
        promotions: {
            type: Boolean,
            default: true
        },
        reminders: {
            type: Boolean,
            default: true
        }
    }
}, { timestamps: true });
