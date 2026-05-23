import express, { Request, Response } from 'express'
import db from '../db/conn.js'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const collection = await db.collection('products')
  const results = await collection
    .aggregate([
      // // 1. 先过滤出你想要搜索的商品名
      // {
      //   $match: { name: req.query.name }
      // },
      {
        $lookup: {
          from: 'brands',
          localField: 'brand_ids',
          foreignField: '_id',
          as: 'brands'
        }
      }
    ])
    .toArray()
  res.json({
    success: true,
    IsOK: true,
    Extra: JSON.stringify(results)
  })
})
export default router
