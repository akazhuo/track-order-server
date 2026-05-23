import { MongoClient } from 'mongodb'
const connectionString = process.env.DB_URL || ''
// const client = new MongoClient(connectionString)
const dbName = process.env.DB_NAME || ''

let _db = null // 全局变量，用于缓存 db 实例（实现单例）
// let conn

// try {
//   // 1. 先建立连接
//   conn = await client.connect()
//   console.log('MongoDB 连接成功')

//   // 2. 连接成功后，再获取 db 实例并执行操作
//   let db = conn.db('track_order')
//   // 在 product 集合的 brand_ids 字段上建立索引
//   await db.collection('products').createIndex({ brand_ids: 1 })
//   console.log('索引创建成功')
// } catch (e) {
//   console.error('连接或操作失败:', e)
// } finally {
//   // 3. 建议在最后关闭连接，释放资源
//   await client.close()
// }

// 导出一个异步函数来获取 db 实例
async function getDb() {
  // 如果已经有 db 实例，直接返回，避免重复连接
  if (_db) {
    return _db
  }

  try {
    const client = new MongoClient(connectionString)
    await client.connect()
    console.log('MongoDB 数据库连接成功！')

    // 缓存 db 实例
    _db = client.db(dbName)

    // 在 product 集合的 brand_ids 字段上建立索引
    await _db.collection('products').createIndex({ brand_ids: 1 })
    return _db
  } catch (error) {
    console.error('数据库连接失败:', error)
    throw error // 抛出错误，让调用方处理
  }
}

export default getDb
