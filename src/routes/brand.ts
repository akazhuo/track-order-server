import express, { Request, Response } from 'express'
import db from '../db/conn.js'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const collection = await db.collection('brands')
  const results = await collection.find({}).toArray()
  res.json({
    code: 0,
    success: true,
    IsOK: true,
    Extra: JSON.stringify(results)
  })
})

router.get('/search', async (req: Request, res: Response) => {
  const collection = await db.collection('brands')
  const query = req.query
  const results = await collection.find(query).toArray()
  res.json({
    success: true,
    IsOK: true,
    Extra: JSON.stringify(results)
  })
})

router.post('/add', async (req: Request, res: Response) => {
  const { product_id, name } = req.body
  res.status(400).send()
  // const products = db.collection('products')
  // products.updateOne(
  //   { _id: ObjectId('targetProductId') }, // 1. 筛选出要更新的目标产品
  //   { $push: { brand_ids: ObjectId('newBrandId') } } // 2. 将新品牌ID推入 brand_ids 数组
  // )
})

export default router
