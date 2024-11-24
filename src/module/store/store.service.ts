import { Inject, Service } from "typedi";
import { BadRequestError, NotFoundError } from "routing-controllers";

import { IStore } from "../../core/model/store";
import { StoreStore } from "./store.store";

@Service("store.service")
export class StoreService {
    constructor(
        @Inject("store.store") private readonly stores: StoreStore
    ) { }

    async getAllStore(): Promise<IStore[]> {
        return await this.stores.fetchAllStore()
    }

    async findUniqueOrFail(filter: Partial<IStore>): Promise<IStore> {
        const store = await this.stores.get(filter)
        if (!store) throw new NotFoundError("Store Not Found")
        return store
    }

    async createStore(partial: Partial<IStore>): Promise<IStore> {
        const store = await this.stores.create(partial)
        if (!store) throw new BadRequestError("Store creation failed")
        return store
    }

    async updateStore(id: string, partial: Partial<IStore>): Promise<IStore> {
        const store = await this.stores.update(id, partial)
        if (!store) throw new BadRequestError("Store update failed")
        return store
    }

    async deleteStore(id: string): Promise<IStore> {
        const store = await this.stores.delete(id)
        if (!store) throw new NotFoundError("Store Not Found")
        return store
    }

    async findStore(filters: Partial<IStore>): Promise<IStore> {
        const store = await this.stores.getOneByAtLeastOneCondition([
            filters,
        ]);
        if (!store) throw new NotFoundError("Store Not Found");
        return store;
    }

    async getStoreProduct(storeId: string): Promise<IStore> {
        const store = await this.stores.getStoreProduct(storeId);
        if (!store) throw new NotFoundError("Store Not Found");
        return store;
    }

}