import { Service } from "typedi";
import { FilterQuery, Types } from "mongoose";
import { Faq } from "../../core/model/faqs/faq.model";
import { IFaq } from "../../core/model/faqs/IFaq";

@Service("faq.store")
export class FaqStore {
  async get(filter: FilterQuery<IFaq>): Promise<IFaq | null> {
    return await Faq.findOne(filter);
  }

  async create(partial: Partial<IFaq>): Promise<IFaq> {
    const faq = new Faq(partial);
    await faq.save();
    return faq;
  }

  async update(_id: string, partial: Partial<IFaq>): Promise<IFaq | null> {
    return await Faq.findOneAndUpdate(
      { _id: new Types.ObjectId(_id) },
      partial
    );
  }

  async getOneByAtLeastOneCondition(
    filters: FilterQuery<IFaq>[]
  ): Promise<IFaq | null> {
    return await Faq.findOne({ $or: filters });
  }

  async queryOne(params: {
    equ?: { title: string; val: string };
  }): Promise<IFaq> {
    let query = Faq.find();
    query.setOptions({ lean: true });
    if (params.equ)
      query = query.where(params.equ.title).equals(params.equ.val);
    const result = await query.exec();
    return result[0];
  }
}
