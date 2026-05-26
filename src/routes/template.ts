import express, { Request, Response } from 'express'
import TemplateService from '@/services/TemplateService.js'
import uploadMiddleWare from '@/middlewares/upload.js'

const router = express.Router()
const service = new TemplateService()
// 配置需要接收的字段及最大文件数
const cpUpload = uploadMiddleWare.fields([
  { name: 'bannerImg', maxCount: 2 }, // Banner 图
  { name: 'brandImg', maxCount: 1 }, // 单个品牌 Logo
  { name: 'descImg', maxCount: 6 }, // 最多 6 张详情图
  { name: 'video', maxCount: 1 } // 单个视频
])

router.get('/', async (req: Request, res: Response) => {
  const results = await service.getList()
  res.success(results)
})

router.get('/add', cpUpload, async (req: Request, res: Response) => {
  try {
    // 多字段上传时，文件信息在 req.files 对象中，键名就是字段名
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }
    // 提取各个字段的文件路径
    const banner = files['bannerImg'] ? `/uploads/${files['bannerImg'][0].filename}` : null
    const brandLogo = files['brandImg'] ? `/uploads/${files['brandImg'][0].filename}` : null
    const video = files['video'] ? `/uploads/${files['video'][0].filename}` : null

    // descImg 是多张，使用 map 提取路径数组
    const descImgs = files['descImg']
      ? files['descImg'].map((file) => `/uploads/${file.filename}`)
      : []

    res.json({
      banner,
      brandLogo,
      video,
      descImgs
    })

    // const { product_id, brand_id, banner_imgs } = req.body
    // const newTemId = await service.add({ product_id, brand_id })

    // res.success(results)
  } catch (error) {}
})

export default router
