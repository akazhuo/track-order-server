import getDb from '@/db/conn.js'
import type { ObjectId } from 'mongodb'
import { BaseService } from './BaseService.js'

export default class BrandService extends BaseService {
  async getList() {
    const collection = await this.db.collection('brands')
    const results = await collection.find({}).toArray()
    return results
  }
  async search(query: { [k: string]: any; _id?: ObjectId | undefined }) {
    const db = await getDb()
    const collection = await db.collection('brands')
    const results = await collection.find(query).toArray()
    return results
  }
}
