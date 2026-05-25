import express, { Request, Response } from 'express'
import BrandServices from '@/services/BrandService'

const router = express.Router()
const service = new BrandServices()

router.get('/', async (req: Request, res: Response) => {
  const results = await service.getList()
  res.json({
    code: 0,
    success: true,
    IsOK: true,
    Extra: JSON.stringify(results)
  })
})

router.get('/search', async (req: Request, res: Response) => {
  const results = await service.search(req.query)
  res.json({
    success: true,
    IsOK: true,
    Extra: JSON.stringify(results)
  })
})

router.post('/add', async (req: Request, res: Response) => {
  const { product_id, name } = req.body
  res.status(400).send()
  const brand = db.collection('products')
  // products.updateOne(
  //   { _id: ObjectId('targetProductId') }, // 1. 筛选出要更新的目标产品
  //   { $push: { brand_ids: ObjectId('newBrandId') } } // 2. 将新品牌ID推入 brand_ids 数组
  // )
})

export default router
