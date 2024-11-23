import 'reflect-metadata';
import { Get, JsonController, Req, Res, Post, Body, Param, Put, BadRequestError } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { ProductService } from '../../../module/products';
import { Types } from 'mongoose';

@Service()
@JsonController('/product')
export class ProductController {
    constructor(
        @Inject('product.service') private readonly productService: ProductService
    ) { }

    @Get('/:id')
    async getProductById(@Param('id') id: Types.ObjectId, @Res() response: any) {
        try {
            const product = await this.productService.findUniqueOrFail(
                { _id: id }
            )
            return response.status(200).send(product);
        } catch (error: any) {
            throw new BadRequestError(error.message);
        }
    }

    @Post('/create')
    async createProduct(@Body() body: any, @Res() response: any) {
        try {
            const newProduct = await this.productService.createProduct(body);
            return response.status(201).send(newProduct);
        } catch (error: any) {
            console.log(error);
            throw new BadRequestError(error.message);
        }
    }
}