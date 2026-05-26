import express, { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

// 确保 uploads 目录存在
const uploadDir = path.resolve(__dirname, './uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// 配置 multer 的磁盘存储引擎
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir) // 文件保存的文件夹
  },
  filename: (req, file, cb) => {
    // 防止文件名重复：时间戳 + 原始文件后缀
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

// 文件过滤（只允许上传图片）
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
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

// 实例化 multer
export default multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 限制单文件最大 50MB (考虑到视频)
})
