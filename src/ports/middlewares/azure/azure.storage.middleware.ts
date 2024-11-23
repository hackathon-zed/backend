import { BlobServiceClient } from "@azure/storage-blob";
import multer from "multer";

import { Request, Response, NextFunction } from "express";
import { azureBlobConfig } from "../../../infra/azure/blob.storage";
import { MulterAzureStorage } from "multer-azure-blob-storage";
import { BadRequestError } from "routing-controllers";

const blobServiceClient = BlobServiceClient.fromConnectionString(azureBlobConfig.connectionString);

export const azureBlobStorageMiddleware = multer({
    storage: new MulterAzureStorage({
        connectionString: azureBlobConfig.connectionString,
        containerName: azureBlobConfig.containerName,
        containerAccessLevel: "blob",
        urlExpirationTime: 60,
    }),
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new BadRequestError("Only image files are allowed"));
        }

        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB file size limit
    },
}).single("image"); // "image" is the field name in the form-data
