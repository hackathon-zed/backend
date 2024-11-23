import { Service } from "typedi";
import { ICustomer, Customer } from "../../core/model/customer";
import { FilterQuery, Types } from 'mongoose';

@Service("customer.store")
export class CustomerStore {

    async get(filter: FilterQuery<ICustomer>): Promise<ICustomer | null> {
        return await Customer.findOne(filter)
    }

    async create(partial: Partial<ICustomer>): Promise<ICustomer> {
        const customer = new Customer(partial)
        await customer.save()
        return customer
    }

    async update(_id: string, partial: Partial<ICustomer>): Promise<ICustomer | null> {
        const customer = await Customer.findOneAndUpdate({ _id: new Types.ObjectId(_id) }, partial)
        return customer
    }

    async getOneByAtLeastOneCondition(filters: FilterQuery<ICustomer>[]): Promise<ICustomer | null> {
        const customer = await Customer.findOne({ $or: filters })
        return customer
    }

    async queryOne(params: { equ?: { title: string, val: string } }): Promise<ICustomer> {
        let query = Customer.find();
        query.setOptions({ lean: true });
        if (params.equ) query = query.where(params.equ.title).equals(params.equ.val)
        const result = await query.exec()
        return result[0]
    }
}