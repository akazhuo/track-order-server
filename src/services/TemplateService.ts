import { Filter, Document, ObjectId } from 'mongodb'
import fs from 'fs'
import { BaseService } from './BaseService'

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
    } catch (err) {}
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
      const id = data.id
      const oldResult = await this.search({ _id: new ObjectId(id) })

      function delFile(file: string) {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file)
        }
      }

      if (oldResult) {
        ;['banner_imgs', 'brand_img', 'desc_imgs', 'video'].forEach((key) => {
          if (oldResult[key]) {
            if (oldResult[key] instanceof Array) {
              oldResult[key].forEach((item) => delFile(item))
            } else {
              delFile(oldResult[key])
            }
          }
        })
      }

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
          },
          { upsert: true }
        )

        return result

        // 如果这里抛出异常，上面的操作自动回滚
      })
    } catch (err) {
      // 事务回滚
    }
  }
}
