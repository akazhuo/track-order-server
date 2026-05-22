import { GET, POST } from '@/api/http'
import type { Brand } from '@/types/trackOrderPage'

export async function getProduct() {
  return GET<Brand[]>('http://localhost:3000/product/')
}

export async function getBrand() {
  return GET<Brand[]>('http://localhost:3000/brand/')
}

export async function searchBrand(data: { [k: string]: string }) {
  return GET<Brand[]>('http://localhost:3000/brand/', data)
}
