export type Product = {
  name: string
  _id: string
}

export type Brand = {
  name: string
  _id: string
}

export interface FormData {
  brand: string
  product: string
  banner: string[]
  brandImg: string
}
