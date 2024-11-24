import { Service } from "typedi";
import { IProduct, Product } from "../../core/model/product";

import { FilterQuery, Types } from "mongoose";

@Service("product.store")
export class ProductStore {


    async fetchAllProdut(): Promise<IProduct[]> { 
        return await Product.find();
    }



    async get(filter: FilterQuery<IProduct>): Promise<IProduct | null> {
        return await Product.findOne(filter);
    }

    async create(partial: Partial<IProduct>): Promise<IProduct> {
        const product = new Product(partial);
        await product.save();
        return product;
    }

    async update(_id: string, partial: Partial<IProduct>): Promise<IProduct | null> {
        const product = await Product.findOneAndUpdate({ _id: new Types.ObjectId(_id) }, partial);
        return product;
    }

    async getOneByAtLeastOneCondition(filters: FilterQuery<IProduct>[]): Promise<IProduct | null> {
        const product = await Product.findOne({ $or: filters });
        return product;
    }
}