import { Service } from "typedi";
import { Store, IStore } from "../../core/model/store";
import { FilterQuery, Types } from "mongoose";

@Service("store.store")
export class StoreStore {
    async fetchAllStore(): Promise<IStore[]> {
        return await Store.find();
    }

    async get(filter: FilterQuery<IStore>): Promise<IStore | null> {
        return await Store.findOne(filter);
    }

    async create(partial: Partial<IStore>): Promise<IStore> {
        const store = new Store(partial);
        await store.save();
        return store;
    }

    async update(_id: string, partial: Partial<IStore>): Promise<IStore | null> {
        const store = await Store.findOneAndUpdate(
            { _id: new Types.ObjectId(_id) },
            partial
        );
        return store;
    }

    async delete(_id: string): Promise<IStore | null> {
        const store = await Store.findOneAndDelete({ _id: new Types.ObjectId(_id) });
        return store;
    }

    async getOneByAtLeastOneCondition(
        filters: FilterQuery<IStore>[]
    ): Promise<IStore | null> {
        const store = await Store.findOne({ $or: filters });
        return store;
    }

    // write function to get store product
    async getStoreProduct(storeId: string): Promise<IStore | null> {
        const store = await Store.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(storeId),
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "store",
                    as: "products",
                },
            },
        ]);
        return store[0];
    }
}