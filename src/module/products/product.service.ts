import { Inject, Service } from "typedi";
import { BadRequestError, NotFoundError } from "routing-controllers";

import { IProduct } from "../../core/model/product";
import { ProductStore } from "./product.store";

@Service("product.service")
export class ProductService {
    constructor(
        @Inject("product.store") private readonly products: ProductStore
    ) { }

    async findUniqueOrFail(filter: Partial<IProduct>): Promise<IProduct> {
        const product = await this.products.get(filter)
        if (!product) throw new NotFoundError("Product Not Found")
        return product
    }

    async createProduct(partial: Partial<IProduct>): Promise<IProduct> {
        const product = await this.products.create(partial)
        if (!product) throw new BadRequestError("Product creation failed")
        return product
    }
}