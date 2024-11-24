import { Inject, Service } from "typedi";
import { BadRequestError, JsonController, Post, Req, UseBefore } from "routing-controllers";
import { SpeechTextService } from "../../../../module/azure";
import { SpeechUploadFileMiddleware } from "../../../middlewares";
import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import { Readable, Writable } from "stream";

@Service()
@JsonController('/azure')
export class SpeechToTextController {
    constructor(
        @Inject('speech-text.service') private readonly speechToTextService: SpeechTextService
    ) { }

    @Post('/speech-translate')
    @UseBefore(SpeechUploadFileMiddleware)
    async speechTranslate(@Req() req: any): Promise<object> {
        const audioFile = req.file;
        console.log("Audio file:", audioFile);

        if (!audioFile) {
            throw new BadRequestError("No audio file provided.");
        }

        try {
            const { originalname, buffer } = audioFile;

            // Check if file type is webm
            if (originalname.endsWith('.webm')) {
                console.log("Converting webm to wav...");
                const wavBuffer = await this.convertWebmToWav(buffer);
                return this.speechToTextService.speechTranslation(wavBuffer);
            }

            // If already wav or other supported format, pass directly
            return this.speechToTextService.speechTranslation(buffer);
        } catch (error: any) {
            throw new BadRequestError(error.message || "Failed to process the audio file.");
        }
    }

    private async convertWebmToWav(webmBuffer: Buffer): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const inputStream = Readable.from(webmBuffer);
            const outputStream: Buffer[] = [];

            // Create a custom writable stream
            const writableStream = new Writable({
                write(chunk: Buffer, encoding: BufferEncoding, callback: (error?: Error | null) => void) {
                    outputStream.push(chunk);
                    callback();
                }
            });

            ffmpeg()
                .setFfmpegPath(ffmpegInstaller.path)
                .input(inputStream)
                .inputFormat('webm')
                .outputFormat('wav')
                .on('error', (err) => {
                    console.error("Error during conversion:", err);
                    reject(new Error("Failed to convert webm to wav."));
                })
                .on('end', () => {
                    console.log("Conversion completed successfully.");
                    resolve(Buffer.concat(outputStream));
                })
                .pipe(writableStream);
        });
    }
}