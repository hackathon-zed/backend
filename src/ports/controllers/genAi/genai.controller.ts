import { JsonController, Post, UseBefore, Req, HttpError } from "routing-controllers";
import { Service } from "typedi";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import multer from "multer";

// Set up Multer for handling image uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB file size limit
    },
});

@Service()
@JsonController("/genai")
export class GenAiController {
    private genAI: GoogleGenerativeAI;
    private readonly ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

    constructor() {
        // Initialize the Google Generative AI client
        this.genAI = new GoogleGenerativeAI("AIzaSyCOfoIUYgCvivmK7rO_McxcIE4oFyfLeqQ"); // Use environment variables for better security
    }

    @Post("/recognize")
    @UseBefore(upload.single("image"))
    async recognizeImage(@Req() req: any): Promise<any> {
        try {
            const file = req.file;

            if (!file) {
                throw new HttpError(400, "No image file uploaded");
            }

            // Validate file (mime type, size)
            this.validateImage(file);

            console.log("Processing image:", file);

            const base64Image = file.buffer.toString('base64');
            const imagePart: Part = {
                inlineData: {
                    data: base64Image, // Now sending the base64-encoded image data
                    mimeType: file.mimetype
                }
            };

            // Initialize the generative AI model with gemini-1.5-flash
            const model = this.genAI.getGenerativeModel({
                model: "gemini-1.5-pro",

            });

            // Generate content using the uploaded image
            const result = await model.generateContent([
                "Tell me about this image in brief:",
                imagePart
            ]);

            // Extract response text
            const responseText = await result.response.text(); // Ensure this is awaited properly

            return {
                status: "success",
                description: responseText,
                metadata: {
                    filename: file.originalname,
                    mimetype: file.mimetype,
                    size: file.size
                }
            };

        } catch (error: any) {
            console.error("Error processing image:", error);

            if (error instanceof HttpError) {
                throw error; // Rethrow custom HttpError for API response
            }

            // Handle specific Google AI errors
            if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
                throw new HttpError(429, "API rate limit exceeded. Please try again later.");
            }

            if (error.message?.includes('model')) {
                throw new HttpError(503, `Model error: ${error.message}`);
            }

            // Generic error handling
            throw new HttpError(500, `Error processing the image: ${error.message}`);
        }
    }

    private validateImage(file: Express.Multer.File): void {
        // Check mime type
        if (!this.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            throw new HttpError(
                400,
                `Invalid image format. Supported formats: ${this.ALLOWED_MIME_TYPES.join(', ')}`
            );
        }

        // Check file size (5MB limit)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new HttpError(
                400,
                `Image size (${Math.round(file.size / 1024 / 1024)}MB) exceeds 5MB limit`
            );
        }
    }
}
