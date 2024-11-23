import { Inject, Service } from "typedi";
import { BadRequestError, NotFoundError, JsonController, Get, Body } from "routing-controllers";
import { SpeechTextService } from "../../../../module/azure";
@Service()
@JsonController('/azure')
export class SpeechToTextController {
    constructor(
        @Inject('speech-text.service') private readonly speechToTextService: SpeechTextService
    ) { }

    // @Get('/speech-to-text')
    // async speechToText(file: any): Promise<any> {
    //     try {
    //         return this.speechToTextService.setartSpeechRecognition()
    //     } catch (error: any) {
    //         throw new BadRequestError(error)
    //     }
    // }

    @Get('/speech-translate')
    async speechTranslate(@Body() body: any): Promise<object> {
        const { audioFileBuffer } = body
        try {
            return this.speechToTextService.speechTranslation(audioFileBuffer)
        } catch (error: any) {
            throw new BadRequestError(error)
        }
    }
}
