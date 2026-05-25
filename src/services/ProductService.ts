import { ObjectId } from 'mongodb'
import { BaseService } from './BaseService'

export default class ProductService extends BaseService {
  async getList() {
    const collection = await this.db.collection('products')
    const results = await collection
      .aggregate([
        // // 1. 先过滤出你想要搜索的商品名
        // {
        //   $match: { name: req.query.name }
        // },
        {
          $lookup: {
            from: 'brands',
            localField: 'brand_ids',
            foreignField: '_id',
            as: 'brands'
          }
        }
      ])
      .toArray()
    return results
  }
  search(query: { [k: string]: any; _id?: ObjectId | undefined }) {}
}
