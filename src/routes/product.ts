import express, { Request, Response } from 'express'
import ProductService from '@/services/ProductService'

const router = express.Router()
const service = new ProductService()

router.get('/', async (req: Request, res: Response) => {
  const results = await service.getList()
  res.success(results)
})
export default router
