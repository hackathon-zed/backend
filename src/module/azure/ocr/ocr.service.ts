import { Service } from "typedi";
import axios from "axios";
import * as fs from "fs";
import { enviroment } from "../../../infra/enviroment";

const { DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
const { DefaultAzureCredential } = require("@azure/identity");

@Service("ocr.service")
export class OcrService {
    private readonly formRecognizerEndpoint: string;
    private readonly client: typeof DocumentAnalysisClient;

    constructor() {
        this.formRecognizerEndpoint = enviroment.azure.ocr.ocrendpoint // Replace with your Azure Form Recognizer endpoint
        const credential = new DefaultAzureCredential(); // Automatically fetches credentials
        this.client = new DocumentAnalysisClient(this.formRecognizerEndpoint, credential);
    }


    async extractText(file: any): Promise<string> {
        try {
            // Read the document
            const documentBuffer = file.buffer;

            // Start document analysis
            const poller = await this.client.beginAnalyzeDocument("prebuilt-read", documentBuffer);

            // Wait for the result
            const result = await poller.pollUntilDone();

            if (!result || !result.pages) {
                throw new Error("No text found in the document.");
            }

            // Extract text from the result
            let extractedText = "";
            for (const page of result.pages) {
                for (const line of page.lines) {
                    extractedText += line.content + " ";
                }
            }

            console.log("Extracted Text: ", extractedText);
            return extractedText.trim();
        } catch (error: any) {
            console.error("Error extracting text from document:", error);
            throw new Error("Error extracting text from document: " + error.message);
        }
    }

    /**
     * Translate extracted text to a specified target language
     * @param text - Text to translate
     * @param targetLanguage - Target language code (e.g., 'mai' for Maithili)
     * @returns Translated text
     */
    async translateText(text: string, targetLanguage: string): Promise<string> {
        const translatorEndpoint = "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0";
        const translatorApiKey = enviroment.azure.ocr.translatorapiKey; // Replace with your Translator API key
        const region = enviroment.azure.ocr.region; // Replace with your region if required

        try {
            const response = await axios.post(
                `${translatorEndpoint}&to=${targetLanguage}`,
                [{ text }],
                {
                    headers: {
                        "Ocp-Apim-Subscription-Key": translatorApiKey,
                        "Content-Type": "application/json",
                        "Ocp-Apim-Subscription-Region": region, // Add if necessary
                    },
                }
            );

            const translatedText = response.data[0].translations[0].text;
            console.log("Translated Text: ", translatedText);
            return translatedText;
        } catch (error: any) {
            console.error("Error in translation request:", error);
            throw new Error("Error in translation: " + error.message);
        }
    }

    /**
     * End-to-End OCR and Translation
     * @param filePath - Path to the document
     * @param targetLanguage - Target language code (e.g., 'mai' for Maithili)
     * @returns Translated text
     */
    async ocrAndTranslate(file: File): Promise<string> {
        console.log("Starting OCR and translation process...", file);
        try {
            const extractedText = await this.extractText(file);
            console.log("Extracted Text:", extractedText);
            const translatedText = await this.translateText(extractedText, 'hi');
            return translatedText;
        } catch (error) {
            console.error("Error in OCR and translation process:", error);
            throw error;
        }
    }
}
