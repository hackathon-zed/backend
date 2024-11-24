import { JsonController, Get, Post, BadRequestError, Body, UseBefore, Req } from "routing-controllers";
import { Inject, Service } from "typedi";
import { OcrService } from "../../../../module/azure/ocr";
import { OcrMiddleware } from "../../../middlewares";
import axios from "axios";
import { enviroment } from "../../../../infra/enviroment";


@Service()
@JsonController("/azure")
export class OcrController {
    constructor(
        @Inject("ocr.service")
        private readonly ocrService: OcrService
    ) { }

    // @Get("/ocr")
    // async ocr(file: any): Promise<any> {
    //     try {
    //         return this.ocrService.startOcr()
    //     } catch (error: any) {
    //         throw new BadRequestError(error)
    //     }
    // }

    @Post("/ocr-translate")
    @UseBefore(OcrMiddleware)
    async ocrTranslate(@Req() req: any): Promise<void> {
        const file = req.file;
        console.log("File", file);
        if (!file) {
            throw new BadRequestError("No file found in the request");
        }

        try {
           
        } catch (error: any) {
            console.error('Error during OCR request:', error.response ? error.response.data : error.message);
        }

    }
}