import { Inject, Service } from "typedi";
import { BadRequestError, NotFoundError } from "routing-controllers";

import { FaqStore } from "./faq.store";
import { IFaq } from "../../core/model/faqs/IFaq";

@Service("faq.service")
export class FaqService {
  constructor(@Inject("faq.store") private readonly faqs: FaqStore) {}

  async findUniqueOrFail(filter: Partial<IFaq>): Promise<IFaq> {
    const custoemr = await this.faqs.get(filter);
    if (!custoemr) throw new NotFoundError("customer Not Found");
    return custoemr;
  }

  async findUnique(filter: Partial<IFaq>): Promise<IFaq | null> {
    const faq = await this.faqs.get(filter);
    return faq;
  }

  async createFaq(partial: Partial<IFaq>): Promise<IFaq> {
    const faq = await this.faqs.create(partial);
    if (!faq) throw new BadRequestError("User creation failed");
    return faq;
  }

  async updateFaq(id: string, partial: Partial<IFaq>): Promise<IFaq> {
    const faq = await this.faqs.update(id, partial);
    if (!faq) throw new BadRequestError("User update failed");
    return faq;
  }

  async findFaq(filters: Partial<IFaq>): Promise<IFaq> {
    const faq = await this.faqs.getOneByAtLeastOneCondition([filters]);
    if (!faq) throw new NotFoundError("Faq Not Found");
    return faq;
  }
}
