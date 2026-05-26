import express, { Request, Response } from 'express'
import cors from 'cors'
// Load environment variables
import './loadEnvironment.js'
import getDb from './db/conn.js'
import { responseMiddleware } from './middlewares/response.js'
import { errorHandler } from './middlewares/errorHandler.js'
import productRoute from './routes/product.js'
import brandRoute from './routes/brand.js'

const app = express()
const PORT = (process.env.PORT as any as number) || 3000

// 让 /uploads 路径可以直接访问到项目根目录下的 uploads 文件夹
app.use('/uploads', express.static('uploads'))
app.use(cors())
app.use(express.json())
app.use(responseMiddleware)
app.use('/product', productRoute)
app.use('/brand', brandRoute)

app.get('/test', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the Express TypeScript backend!' })
})

// Get a list of 50 posts
app.get('/', async (req, res) => {
  const db = await getDb()
  let collection = await db.collection('posts')
  let results = await collection.find({}).limit(50).toArray()
  res.send(results).status(200)
})
// 全部捕获错误中间件
app.use(errorHandler)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
