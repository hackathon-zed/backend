import { Service } from "typedi";
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";
import { enviroment } from "../../../infra/enviroment";
import path from "path";
import fs from "fs";

@Service('speech-text.service')
export class SpeechTextService {

    private readonly speechToTextRegion: string;
    private readonly speechToTextApiKey: string;

    constructor() {
        this.speechToTextRegion = enviroment.azure.speechtotext.region;
        this.speechToTextApiKey = enviroment.azure.speechtotext.apiKey;
    }

    // async setartSpeechRecognition(): Promise<void> {
    //     const speechConfig = speechsdk.SpeechConfig.fromSubscription(
    //         this.speechToTextApiKey,
    //         this.speechToTextRegion
    //     );

    //     // Resolve the path to the audio file in the `src` folder
    //     const filePath: string = path.resolve(__dirname, "../../../azure-audio.wav");
    //     console.log("Reading audio file from: ", filePath);

    //     // Read the WAV file into a Buffer
    //     const audioFileBuffer = fs.readFileSync(filePath);

    //     // Set up the audio configuration (using the default microphone)
    //     const audioConfig = speechsdk.AudioConfig.fromWavFileInput(audioFileBuffer);

    //     // Create the speech recognizer
    //     const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

    //     // Start continuous recognition
    //     recognizer.startContinuousRecognitionAsync(
    //         () => console.log("Speech recognition started."),
    //         (err) => console.error("Error starting speech recognition: ", err)
    //     );

    //     // Handle recognition results
    //     recognizer.recognized = (s, e) => {
    //         if (e.result.reason === speechsdk.ResultReason.RecognizedSpeech) {
    //             console.log(`Recognized Text: ${e.result.text}`);
    //             this.translateText(e.result.text);
    //         } else if (e.result.reason === speechsdk.ResultReason.NoMatch) {
    //             console.warn("No speech could be recognized.");
    //         }
    //     };

    //     // Handle recognition errors
    //     recognizer.canceled = (s, e) => {
    //         console.error(`Speech recognition canceled: ${e.errorDetails}`);
    //         recognizer.stopContinuousRecognitionAsync();
    //     };

    //     recognizer.sessionStopped = () => {
    //         console.log("Speech recognition session stopped.");
    //         recognizer.stopContinuousRecognitionAsync();
    //     };
    // }

    // async translateText(text: string): Promise<void> {
    //     console.log("Translating text: ", text);
    // }
    async speechTranslation(audioFile: string | Buffer): Promise<object> {
        const speechTranslationConfig = speechsdk.SpeechTranslationConfig.fromSubscription(
            this.speechToTextApiKey,
            this.speechToTextRegion
        );

        let translatedText = "";

        // Set the source and target languages
        speechTranslationConfig.speechRecognitionLanguage = "en-US";
        speechTranslationConfig.addTargetLanguage("hi");

        try {
            // If the audio file is a path, read it as a Buffer
            let audioFileBuffer: Buffer;

            if (typeof audioFile === "string") {
                // Read the WAV file into a Buffer if the input is a file path
                const filePath = path.resolve(audioFile);
                console.log("Reading audio file from: ", filePath);
                audioFileBuffer = fs.readFileSync(filePath);
            } else {
                // If it's already a Buffer, use it directly
                audioFileBuffer = audioFile;
            }

            // Set up the audio configuration (using the file buffer)
            const audioConfig = speechsdk.AudioConfig.fromWavFileInput(audioFileBuffer);

            // Create the translation recognizer
            const recognizer = new speechsdk.TranslationRecognizer(speechTranslationConfig, audioConfig);

            return new Promise((resolve, reject) => {
                // Start recognition
                recognizer.startContinuousRecognitionAsync(
                    () => console.log("Speech translation started."),
                    (err) => reject("Error starting speech translation: " + err)
                );

                // Handle recognized text
                recognizer.recognized = (s, e) => {
                    if (e.result.reason === speechsdk.ResultReason.TranslatedSpeech) {
                        console.log(`Recognized Text: ${e.result.text}`);
                        translatedText = e.result.translations.get("hi");
                    } else if (e.result.reason === speechsdk.ResultReason.NoMatch) {
                        console.warn("No speech could be recognized.");
                    }
                };

                // Session stopped
                recognizer.sessionStopped = () => {
                    console.log("Speech translation session stopped.");
                    resolve({ translatedText });
                    recognizer.stopContinuousRecognitionAsync();
                };

                // Handle cancellations
                recognizer.canceled = (s, e) => {
                    console.error("Translation canceled:", e.errorDetails);
                    reject("Translation canceled: " + e.errorDetails);
                };
            });
        } catch (error: any) {
            console.error("Error processing the audio file:", error);
            throw new Error("Error processing the audio file: " + error.message);
        }
    }


}
