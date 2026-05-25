import getDb from '@/db/conn.js'
import type { Db, Collection, Filter, Document } from 'mongodb'

const db = await getDb()
export abstract class BaseService {
  protected db: Db
  protected collection: Collection

  constructor(collectionName: string) {
    this.db = db
    this.collection = db.collection(collectionName)
  }

  abstract getList(): unknown
  abstract search(query: Filter<Document>): unknown
  abstract add(data: Document): unknown
}
