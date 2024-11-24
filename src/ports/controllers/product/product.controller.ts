import 'reflect-metadata';
import { Get, JsonController, Req, Res, Post, Body, Param, Put, BadRequestError, UseBefore } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { ProductService } from '../../../module/products';
import { Types } from 'mongoose';
import { azureBlobStorageMiddleware } from '../../middlewares/azure/azure.storage.middleware';

@Service()
@JsonController('/product')
export class ProductController {
    constructor(
        @Inject('product.service') private readonly productService: ProductService
    ) { }


    @Get('/all')
    async getAllProducts(@Res() response: any) {
        try {
            const products = await this.productService.getAllProduct();
            return response.status(200).send(products);
        } catch (error: any) {
            throw new BadRequestError(error.message);
        }
    }

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
    @UseBefore(azureBlobStorageMiddleware)
    async createProduct(@Body() body: any, @Res() response: any) {
        try {
            const newProduct = await this.productService.createProduct(body);
            return response.status(201).send(newProduct);
        } catch (error: any) {
            console.log(error);
            throw new BadRequestError(error.message);
        }
    }

    @Put('/:id')
    async updateProduct(@Param('id') id: string, @Body() body: any, @Res() response: any) {
        try {
            const updatedProduct = await this.productService.updateProduct(id, body);
            return response.status(200).send(updatedProduct);
        } catch (error: any) {
            throw new BadRequestError(error.message);
        }
    }


    @Post("/upload-image")
    @UseBefore(azureBlobStorageMiddleware)
    async uploadProductImage(@Req() req: any, @Res() response: any) {
        try {
            const image = req.file;
            if (!image) {
                throw new BadRequestError("No image found in the request");
            }

            const imageUrl = req.file.url;
            console.log("Image URL:", imageUrl);

            return response.status(200).send({ message: "Image uploaded successfully", imageUrl });
        } catch (error: any) {
            return response.status(500).send({ message: error.message });
        }
    }
}