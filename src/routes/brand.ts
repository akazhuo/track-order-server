import express, { Request, Response } from 'express'
import BrandServices from '@/services/BrandService'

const router = express.Router()
const service = new BrandServices()

router.get('/', async (req: Request, res: Response) => {
  try {
    const results = await service.getList()

    res.success(results, '获取成功')
  } catch (error) {
    res.fail(500, '获取失败')
  }
})

router.get('/search', async (req: Request, res: Response) => {
  try {
    const results = await service.search(req.query)

    res.success(results, '获取成功')
  } catch (error) {
    res.fail(500, '获取失败')
  }
})

router.post('/add', async (req: Request, res: Response) => {
  try {
    const { product_id, name } = req.body
    await service.add({ product_id, name })
    res.success(null, '添加品牌成功')
  } catch (err) {
    res.fail(500, '添加品牌失败')
  }
})

export default router
