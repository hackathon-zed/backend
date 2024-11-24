import { Schema, model } from "mongoose";

import { ICustomer } from "./ICustomer";






const CustomerSchema = new Schema<ICustomer>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    passwordHash: { type: String },
    email: {
        type: String,
        unique: true,
        required: false,
        sparse: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: function () {
            return this.metadata.provider === 'phone';
        },
        unique: true,
        sparse: true,
        validate: {
            validator: function (phone) {
                return /^\+?[1-9]\d{1,14}$/.test(phone);
            },
            message: 'Invalid phone number'
        },
    },
    role: {
        type: String,
        enum: ['admin', 'customer', 'superadmin', 'staff', 'manager'],
        required: true,
        default: 'customer',

    },
    metadata: {
        googleId: {
            type: String, unique: true, sparse: true,
            required: function () {
                return this.metadata.provider === 'google';
            }
        },
        facebookId: {
            type: String, unique: true, sparse: true,
            required: function () {
                return this.metadata.provider === 'facebook';
            }
        },
        phoneVerified: {
            type: Boolean, default: false,
            required: function () {
                return this.metadata.provider === 'phone';
            }
        },
        emailVerified: {
            type: Boolean, default: false,
            required: function () {
                return this.metadata.provider === 'local' || this.metadata.provider === 'google';
            }
        },
        provider: {
            type: String,
            enum: ['google', 'facebook', 'phone', 'local'],
            required: true
        },
        profileImageUrl: {
            type: String, required: false,
            validate: {
                validator: function (url) {
                    return /^(http|https):\/\/[^ "]+$/.test(url);
                },
                message: 'Invalid URL format'
            }
        }
    },
    preferences: {
        communicationMethod: {
            type: String, enum: ['email', 'sms', 'phone'],
            required: true,
            default: 'email'
        },
        theme: {
            type: String, enum: ['light', 'dark'],
            required: true,
            default: 'light'
        },
        notificationPreferences: {
            orderUpdates: {
                type: Boolean,
                default: true,
            },
            promotions: {
                type: Boolean,
                default: true,
            },
            reminders: {
                type: Boolean,
                default: true,
            }
        }
    },
    orders: {
        type: [Schema.Types.ObjectId],
        ref: 'Order',
    },
}, { timestamps: true });

export const Customer = model<ICustomer>("Customer", CustomerSchema);