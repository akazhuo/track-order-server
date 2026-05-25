// types/express.d.ts
import { Response } from 'express'

// 扩充 Express 原生 Response 接口
declare global {
  namespace Express {
    interface Response {
      success(data?: any, message?: string): Response<ApiResponse>
      fail(code?: number, message?: string, data?: any): Response<ApiResponse>
    }
  }
}
