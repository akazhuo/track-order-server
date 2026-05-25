import getDb from '@/db/conn.js'
import type { Db, ObjectId } from 'mongodb'

const db = await getDb()
export abstract class BaseService {
  protected db: Db

  constructor() {
    this.db = db
  }

  abstract getList(): unknown
  abstract search(query: { [k: string]: any; _id?: ObjectId | undefined }): unknown
}
