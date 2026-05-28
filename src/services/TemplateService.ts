import { Filter, Document, ObjectId } from 'mongodb'
import fs from 'fs'
import path from 'path'
import { BaseService } from './BaseService.js'
import { uploadDirEnv } from '@/middlewares/upload.js'

export default class TemplateService extends BaseService {
  constructor() {
    super('templates')
  }
  getList() {
    throw new Error('Method not implemented.')
  }
  async search(query: Filter<Document>) {
    const result = await this.collection.findOne(query)
    return result
  }
  async add(data: {
    brand_id: string
    brand_img: string | null
    banner_imgs: string[]
    video: string | null
    desc_imgs: string[]
  }) {
    try {
      const result = await this.collection.insertOne({
        brand_id: new ObjectId(data.brand_id),
        brand_img: data.brand_img,
        banner_imgs: data.banner_imgs,
        video: data.video,
        desc_imgs: data.desc_imgs
      })

      return result
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async update(data: {
    id: string
    brand_id: string
    brand_img: string | null
    banner_imgs: string[]
    video: string | null
    desc_imgs: string[]
  }) {
    try {
      // 开启会话并执行事务
      const session = this.db.client.startSession()

      return await session.withTransaction(async () => {
        // 【事务内操作】更新新记录：将新图片的路径写入数据库
        const result = await this.collection.updateOne(
          {
            _id: new ObjectId(data.id)
          },
          {
            $set: {
              brand_id: new ObjectId(data.brand_id),
              brand_img: data.brand_img,
              banner_imgs: data.banner_imgs,
              video: data.video,
              desc_imgs: data.desc_imgs
            }
          }
        )

        return result

        // 如果这里抛出异常，上面的操作自动回滚
      })
    } catch (err) {
      // 事务回滚
    }
  }

  async delFile(filename: string) {
    try {
      const filepath = path.resolve(uploadDirEnv + '/' + filename)
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath)

        return true
      }
      return true
    } catch (err: any) {
      throw new Error(err)
    }
  }
}
