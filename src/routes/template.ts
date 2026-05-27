import express, { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import multer from 'multer'
import TemplateService from '@/services/TemplateService.js'
import uploadInstance from '@/middlewares/upload.js'
import { ObjectId } from 'mongodb'

const router = express.Router()
const service = new TemplateService()
// 配置需要接收的字段及最大文件数
const uploadMiddleware = uploadInstance.fields([
  { name: 'banner_imgs', maxCount: 2 }, // Banner 图
  { name: 'brand_img', maxCount: 1 }, // 单个品牌 Logo
  { name: 'desc_imgs', maxCount: 6 }, // 最多 6 张详情图
  { name: 'video', maxCount: 1 } // 单个视频
])

router.get('/', async (req: Request, res: Response) => {
  const results = await service.getList()
  res.success(results)
})

router.get('/search', async (req: Request, res: Response) => {
  const filerDoc: {
    _id?: ObjectId
    brand_id?: ObjectId
  } = {}
  if (req.query.id) {
    filerDoc._id = new ObjectId(req.query.id as string)
  }
  if (req.query.brand_id) {
    filerDoc.brand_id = new ObjectId(req.query.brand_id as string)
  }
  const results = await service.search(filerDoc)
  res.success(results)
})

router.post('/add', uploadMiddleware, async (req: Request, res: Response) => {
  try {
    // 品牌 id
    const brand_id: string = req.body.brand_id
    // 多字段上传时，文件信息在 req.files 对象中，键名就是字段名
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }
    // 提取各个字段的文件路径
    const brand_img = files['brand_img'] ? `/uploads/${files['brand_img'][0].filename}` : null
    const video = files['video'] ? `/uploads/${files['video'][0].filename}` : null
    // bannerImg 是多张，使用 map 提取路径数组
    const banner_imgs = files['banner_imgs']
      ? files['banner_imgs'].map((file) => `/uploads/${file.filename}`)
      : []
    // descImg 是多张，使用 map 提取路径数组
    const desc_imgs = files['desc_imgs']
      ? files['desc_imgs'].map((file) => `/uploads/${file.filename}`)
      : []

    const insertedResult = await service.add({ brand_id, brand_img, banner_imgs, video, desc_imgs })
    if (!insertedResult) {
      return res.fail(400, '新建模板失败')
    }
    res.success(
      {
        id: insertedResult.insertedId,
        brand_id,
        brand_img,
        banner_imgs,
        video,
        desc_imgs
      },
      '新建模板成功'
    )

    // const { product_id, brand_id, banner_imgs } = req.body
    // const newTemId = await service.add({ product_id, brand_id })

    // res.success(results)
  } catch (error) {
    console.trace(error)
    return res.fail(400, '新建模板失败')
  }
})

router.post('/update', uploadMiddleware, async (req: Request, res: Response) => {
  // 模板 id
  const id = req.body.id
  // 品牌 id
  const brand_id: string = req.body.brand_id
  // 多字段上传时，文件信息在 req.files 对象中，键名就是字段名
  const files = req.files as { [fieldname: string]: Express.Multer.File[] }
  // 提取各个字段的文件路径
  const brand_img = files['banner_imgs'] ? `/uploads/${files['brand_img'][0].filename}` : null
  const video = files['video'] ? `/uploads/${files['video'][0].filename}` : null
  // bannerImg 是多张，使用 map 提取路径数组
  const banner_imgs = files['banner_imgs']
    ? files['banner_imgs'].map((file) => `/uploads/${file.filename}`)
    : []
  // descImg 是多张，使用 map 提取路径数组
  const desc_imgs = files['desc_imgs']
    ? files['desc_imgs'].map((file) => `/uploads/${file.filename}`)
    : []

  const result = await service.update({ id, brand_id, brand_img, banner_imgs, video, desc_imgs })
  if (!result) {
    res.fail(400, '更新模板失败')
  }
  res.success(
    {
      id: result?.upsertedId,
      brand_id,
      brand_img,
      banner_imgs,
      video,
      desc_imgs
    },
    '更新模板成功'
  )
})

export default router
