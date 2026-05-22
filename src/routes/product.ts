import express, { Request, Response } from 'express'
import db from '../db/conn.js'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const collection = await db.collection('products')
  const results = await collection.find({}).toArray()
  res.json({
    code: 0,
    success: true,
    IsOK: true,
    Extra: JSON.stringify(results)
  })
})
export default router
