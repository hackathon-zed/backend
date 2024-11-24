import 'reflect-metadata';
import { Get, JsonController, Req, Res, Post, Body, Param, Put, BadRequestError, UseBefore } from 'routing-controllers';

import { Inject, Service } from 'typedi';
import { StoreService } from '../../../module';
import { Types } from 'mongoose';

@Service()
@JsonController('/store')
export class StoreController {
    constructor(
        @Inject('store.service') private readonly storeService: StoreService
    ) { }

    @Get('/all')
    async getAllStores(@Res() response: any) {
        try {
            const stores = await this.storeService.getAllStore();
            return response.status(200).send(stores);
        } catch (error: any) {
            throw new BadRequestError(error.message);
        }
    }

    @Get('/:id')
    async getStoreById(@Param('id') id: Types.ObjectId, @Res() response: any) {
        try {
            const store = await this.storeService.findUniqueOrFail(
                { _id: id }
            )
            return response.status(200).send(store);
        } catch (error: any) {
            throw new BadRequestError(error.message);
        }
    }

    @Post('/create')
    async createStore(@Body() body: any, @Res() response: any) {
        try {
            const newStore = await this.storeService.createStore(body);
            return response.status(201).send(newStore);
        } catch (error: any) {
            console.log(error);
            throw new BadRequestError(error.message);
        }
    }

    @Put('/:id')
    async updateStore(@Param('id') id: string, @Body() body: any, @Res() response: any) {
        try {
            const updatedStore = await this.storeService.updateStore(id, body);
            return response.status(200).send(updatedStore);
        } catch (error: any) {
            throw new BadRequestError(error.message);
        }
    }

    @Get('/get-store-product/:storeId')
    async getStoreProduct(@Param('storeId') storeId: string, @Res() response: any) {
        try {
            const store = await this.storeService.getStoreProduct(storeId);
            return response.status(200).send(store);
        } catch (error: any) {
            throw new BadRequestError(error.message);
        }
    }


}