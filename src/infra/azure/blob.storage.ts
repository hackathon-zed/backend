

export const azureBlobConfig = {
    connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING || "DefaultEndpointsProtocol=https;AccountName=mithilaartstorage;AccountKey=CY8XbmIXVvSW9J5ZD01HR3N7cHDf1JneYo7ekOaNCIA05boU0/+YbsFDvqioYRdXC19Eh3YT53oC+ASts/wtsQ==;EndpointSuffix=core.windows.net",
    containerName: "product-images", // Ensure this container exists in your storage account
};