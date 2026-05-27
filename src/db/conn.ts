import { MongoClient, type Db } from 'mongodb'
const connectionString = process.env.DB_URL || ''
// const client = new MongoClient(connectionString)
const dbName = process.env.DB_NAME || ''

let _db: Db // 全局变量，用于缓存 db 实例（实现单例）
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
    await initIndexes()
    return _db
  } catch (error) {
    console.error('数据库连接失败:', error)
    throw error // 抛出错误，让调用方处理
  }
}

// 封装一个安全的索引初始化函数
async function initIndexes() {
  try {
    // 在 product 集合的 brand_ids 字段上建立索引
    // await _db.collection('products').createIndex({ brand_ids: 1 })

    // 初始化品牌集合的唯一索引（假设是品牌名 name 唯一）
    // 强烈建议给索引起个明确的名字（如 unique_name），避免自动生成导致冲突
    await _db.collection('brands').createIndex({ name: 1 }, { unique: true, name: 'unique_name' })

    // template 创建商品 id 、品牌 id 唯一索引
    await _db
      .collection('templates')
      .createIndex(
        { product_id: 1, brand_id: 1 },
        { unique: true, name: 'unique_product_brand_id' }
      )
  } catch (error) {
    if (error instanceof Error) {
      console.warn('⚠️ 数据库索引初始化遇到小问题，但不影响主流程:', error.message)
    }
  }
}

export default getDb
