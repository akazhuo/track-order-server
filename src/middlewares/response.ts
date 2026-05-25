import { ApiResponse } from '@/types/response'
import { Response, Request, NextFunction } from 'express'

export const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 处理成功的响应，默认状态码 200
  res.success = (data?, message = '请求成功') => {
    return res.status(200).json({
      code: 200,
      success: true,
      IsOK: true,
      OKMsg: message,
      Extra: data ? JSON.stringify(data) : null
    })
  }

  // 处理失败的响应，可传入自定义状态码和错误信息
  res.fail = (code = 500, message = '请求失败', data?) => {
    return res.status(code).json({
      code,
      success: false,
      IsOK: false,
      ErrMsg: message,
      Extra: data ? JSON.stringify(data) : null
    })
  }

  next()
}
