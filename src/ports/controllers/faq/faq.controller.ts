import "reflect-metadata";
import {
  Get,
  JsonController,
  Req,
  Res,
  Post,
  Body,
  Param,
  Put,
  BadRequestError,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { Types } from "mongoose";
import { FaqService } from "../../../module/faq";

@Service()
@JsonController("/faq")
export class FaqController {
  constructor(
    @Inject("faq.service")
    private readonly faqService: FaqService
  ) {}

  @Get("/:id")
  async getFaqById(@Param("id") id: Types.ObjectId, @Res() response: any) {
    try {
      const faq = await this.faqService.findUniqueOrFail({ _id: id });
      return response.status(200).send(faq);
    } catch (error: any) {
      console.log("error", error);
      throw new BadRequestError(error.message);
    }
  }

  @Post("/create")
  async createFaq(@Body() body: any, @Res() response: any) {
    const { question, answer } = body;
    console.log("question", question);
    try {
      const newFaq = await this.faqService.createFaq({ question, answer });
      return response.status(201).send(newFaq);
    } catch (error: any) {
      console.log(error);
      throw new BadRequestError(error.message);
    }
  }

  @Put("/:id")
  async updateFaq(
    @Param("id") id: string,
    @Body() body: any,
    @Res() response: any
  ) {
    try {
      const updatedFaq = await this.faqService.updateFaq(id, body);
      return response.status(200).send(updatedFaq);
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  @Get("/")
  async findFaq(@Req() request: any, @Res() response: any) {
    try {
      const filters = request.query;
      const faq = await this.faqService.findFaq(filters);
      return response.status(200).send(faq);
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }
}
