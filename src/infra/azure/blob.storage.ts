const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");



export const azureBlobConfig = {
    connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING || "<Your_Connection_String>",
    containerName: "product-images", // Ensure this container exists in your storage account
};



