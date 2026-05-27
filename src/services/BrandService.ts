import { Document, Filter, ObjectId } from 'mongodb'
import { BaseService, UpdateData } from './BaseService.js'

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
  async add(data: { name: string }) {
    try {
      if (!data.name) {
        throw new Error('缺少品牌名')
      }
      const res = await this.collection.insertOne({
        name: data.name
      })
      // const newBrandId = res.insertedId
      // await this.db.collection('products').updateOne(
      //   { _id: productObjectId }, // 1. 筛选出要更新的目标产品
      //   { $addToSet: { brand_ids: newBrandId } } // 2. 将新品牌ID推入 brand_ids 数组
      // )
    } catch (error) {
      throw new Error('品牌已存在')
    }
  }
  update(data: UpdateData): unknown {
    throw new Error('Method not implemented.')
  }
}
