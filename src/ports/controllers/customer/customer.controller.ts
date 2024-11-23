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
import { CustomerService } from "../../../module/customer";
import { Types } from "mongoose";

@Service()
@JsonController("/customer")
export class CustomerController {
  constructor(
    @Inject("customer.service")
    private readonly customerService: CustomerService
  ) {}

  @Get("/:id")
  async getCustomerById(@Param("id") id: Types.ObjectId, @Res() response: any) {
    try {
      const customer = await this.customerService.findUniqueOrFail({ _id: id });
      return response.status(200).send(customer);
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  @Post("/create")
  async createCustomer(@Body() body: any, @Res() response: any) {
    try {
      const newCustomer = await this.customerService.createCustomer(body);
      return response.status(201).send(newCustomer);
    } catch (error: any) {
      console.log(error);
      throw new BadRequestError(error.message);
    }
  }

  @Put("/:id")
  async updateCustomer(
    @Param("id") id: string,
    @Body() body: any,
    @Res() response: any
  ) {
    try {
      const updatedCustomer = await this.customerService.updateCustomer(
        id,
        body
      );
      return response.status(200).send(updatedCustomer);
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  @Get("/")
  async findCustomer(@Req() request: any, @Res() response: any) {
    try {
      const filters = request.query;
      const customer = await this.customerService.findCustomer(filters);
      return response.status(200).send(customer);
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }
}
