import { Request } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
// 最新 node 核心包的导入写法
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
// 获取 __dirname 的 ESM 写法
const __dirname = dirname(fileURLToPath(import.meta.url))
// 限制单文件最大 50MB (考虑到视频)
export const LIMIT_FILE_SIZE = 50 * 1024 * 1024

// 获取环境变量，并设置一个默认的相对路径兜底
const uploadDirEnv = process.env.UPLOAD_DIR || './uploads'
// 用 path.resolve 确保拿到绝对路径
export const UPLOAD_DIR = path.resolve(uploadDirEnv)
// 创建目录，确保 uploads 目录存在
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}

// 配置 multer 的磁盘存储引擎
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR) // 文件保存的文件夹
  },
  filename: (req, file, cb) => {
    // 防止文件名重复：时间戳 + 原始文件后缀
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

// 文件过滤（只允许上传图片）
export const fileFilter = {
  video: () => {},
  img: () => {},
  videoImg: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/quicktime'
    ]
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('不支持的文件类型，请上传图片或 MP4/MOV 视频！'))
    }
  }
}

// 实例化 multer
export default multer({
  storage: storage,
  fileFilter: fileFilter.videoImg,
  limits: { fileSize: LIMIT_FILE_SIZE }
})
