import { Inject, Service } from "typedi";
import { BadRequestError, NotFoundError } from "routing-controllers";

import { ICustomer } from "../../core/model/customer";
import { CustomerStore } from "./customer.store";

@Service("customer.service")
export class CustomerService {
  constructor(@Inject("customer.store") private readonly customers: CustomerStore) {}

  async findUniqueOrFail(filter: Partial<ICustomer>): Promise<ICustomer> {
    const custoemr = await this.customers.get(filter);
    if (!custoemr) throw new NotFoundError("customer Not Found");
    return custoemr;
  }

  async findUnique(filter: Partial<ICustomer>): Promise<ICustomer | null> {
    const customer = await this.customers.get(filter);
    return customer;
  }

  async createCustomer(partial: Partial<ICustomer>): Promise<ICustomer> {
    const customer = await this.customers.create(partial);
    if (!customer) throw new BadRequestError("Customer creation failed");
    return customer;
  }

  async updateCustomer(
    id: string,
    partial: Partial<ICustomer>
  ): Promise<ICustomer> {
    const customer = await this.customers.update(id, partial);
    if (!customer) throw new BadRequestError("Customer update failed");
    return customer;
  }

  async findCustomer(filters: Partial<ICustomer>): Promise<ICustomer> {
    const customer = await this.customers.getOneByAtLeastOneCondition([
      filters,
    ]);
    if (!customer) throw new NotFoundError("Customer Not Found");
    return customer;
  }
}
