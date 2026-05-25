export interface ApiResponse {
  code: number
  success: boolean
  IsOK: boolean
  OKMsg: string
  ErrMsg: string
  Extra: string | null
}
