import getDb from '@/db/conn.js'
import type { ObjectId } from 'mongodb'
import { BaseService } from './BaseService.js'

export default class BrandService extends BaseService {
  constructor() {
    super('brands')
  }
  async getList() {
    // const collection = await this.db.collection('brands')
    const results = await this.collection.find({}).toArray()
    return results
  }
  async search(query: { [k: string]: any; _id?: ObjectId | undefined }) {
    // const collection = await this.db.collection('brands')
    const results = await this.collection.find(query).toArray()
    return results
  }
}
