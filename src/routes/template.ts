import express, { NextFunction, Request, Response } from 'express'
import path from 'path'
import TemplateService from '@/services/TemplateService.js'
import uploadInstance, { uploadDirEnv } from '@/utils/upload.js'
import { ObjectId } from 'mongodb'
import fluentFFmpeg from 'fluent-ffmpeg'

const router = express.Router()
const service = new TemplateService()
// 配置需要接收的字段及最大文件数
const uploadMiddleware = uploadInstance.fields([
  // { name: 'banner_imgs', maxCount: 2 }, // Banner 图
  // { name: 'brand_img', maxCount: 1 }, // 单个品牌 Logo
  // { name: 'desc_imgs', maxCount: 6 }, // 最多 6 张详情图
  // { name: 'video', maxCount: 1 } // 单个视频
  { name: 'file' }
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
// 模板上传资源
router.post('/upload', uploadInstance.single('file'), async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File
    // 视频生成缩略图
    if (file.mimetype.indexOf('video') > -1) {
      const matches = file.filename.match(/.+(?=\.(mp4|avi|rmvb))/)
      if (matches) {
        const name = matches[0]
        fluentFFmpeg(path.resolve(`${uploadDirEnv}/${file?.filename}`)).thumbnail({
          count: 1,
          folder: uploadDirEnv,
          filename: `${name}-thumbnail.png`
        })
      }
    }
    res.success(
      {
        filename: file?.filename
      },
      '上传成功'
    )

    // const { product_id, brand_id, banner_imgs } = req.body
    // const newTemId = await service.add({ product_id, brand_id })

    // res.success(results)
  } catch (error) {
    console.trace(error)
    return res.fail(400, '上传失败')
  }
})

router.post('/add', async (req: Request, res: Response) => {
  try {
    // 提取各个字段
    const { brand_id, brand_img, banner_imgs, desc_imgs, video } = req.body

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
  // 提取各个字段
  const { id, brand_id, brand_img, banner_imgs, desc_imgs, video } = req.body

  const updatedResult = await service.update({
    id,
    brand_id,
    brand_img,
    banner_imgs,
    video,
    desc_imgs
  })
  if (!updatedResult) {
    res.fail(400, '更新模板失败')
  }
  res.success(
    {
      id: updatedResult?.upsertedId,
      brand_id,
      brand_img,
      banner_imgs,
      video,
      desc_imgs
    },
    '更新模板成功'
  )
})
// 部分更新
router.patch('/update', async (req, res) => {
  // 提取各个字段
  const { id, brand_id, brand_img, banner_imgs, desc_imgs, video } = req.body

  const updatedResult = await service.update({
    id,
    brand_id,
    brand_img,
    banner_imgs,
    video,
    desc_imgs
  })
  if (!updatedResult) {
    res.fail(400, '更新模板失败')
  }
  res.success(
    {
      id: updatedResult?.upsertedId,
      brand_id,
      brand_img,
      banner_imgs,
      video,
      desc_imgs
    },
    '更新模板成功'
  )
})
// 模板删除文件资源
router.delete('/delete', (req, res) => {
  try {
    service.delFile(req.body.filename)
    res.success('', '删除文件成功')
  } catch (err) {
    res.fail(400, '删除文件失败')
  }
})

export default router
