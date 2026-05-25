import { type Request, Response, NextFunction } from 'express'

// 注意：错误处理中间件必须是 4 个参数 (err, req, res, next)
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('捕获到全局异常:', err)

  // 根据环境决定是否返回详细的堆栈信息（生产环境建议隐藏堆栈）
  const isDev = process.env.NODE_ENV === 'development'

  res.status(err.statusCode || 500).json({
    code: err.statusCode || 500,
    message: err.message || '服务器内部错误',
    data: isDev ? { stack: err.stack } : null
  })
}
