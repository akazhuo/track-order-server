import { ObjectId } from 'mongodb'
import { BaseService } from './BaseService'

export default class ProductService extends BaseService {
  constructor() {
    super('products')
  }
  async getList() {
    const results = await this.collection
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
  search(query) {}
  async add(data) {
    throw new Error('Method not implemented.')
  }
}
