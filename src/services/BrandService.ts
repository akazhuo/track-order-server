import { Document, Filter, ObjectId } from 'mongodb'
import { BaseService } from './BaseService.js'

export default class BrandService extends BaseService {
  constructor() {
    super('brands')
  }
  async getList() {
    const results = await this.collection.find({}).toArray()
    return results
  }
  async search(query: Filter<Document>) {
    const results = await this.collection.find(query).toArray()
    return results
  }
  async add(data: { name: string; product_id: ObjectId }) {
    try {
      await this.collection.insertOne({
        product_id: new ObjectId(data.product_id),
        name: data.name
      })
      // products.updateOne(
      //   { _id: ObjectId('targetProductId') }, // 1. 筛选出要更新的目标产品
      //   { $push: { brand_ids: ObjectId('newBrandId') } } // 2. 将新品牌ID推入 brand_ids 数组
      // )
    } catch (error) {
      throw new Error('品牌已存在')
    }
  }
}
