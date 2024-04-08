import service from '@/service/index.ts'
import type { AxiosError } from 'axios'

const request = {
  get<T = any>(url: string, data?: any): Promise<T> {
    return request.request('GET', url, { params: data })
  },
  post<T = any>(url: string, data?: any): Promise<T> {
    return request.request('POST', url, { data })
  },
  put<T = any>(url: string, data?: any): Promise<T> {
    return request.request('PUT', url, { data })
  },
  delete<T = any>(url: string, data?: any): Promise<T> {
    return request.request('DELETE', url, { params: data })
  },
  request<T = any>(method = 'GET', url: string, data?: any): Promise<T> {
    return new Promise((resolve, reject) => {
      service({ method, url, ...data })
        .then((res) => {
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          reject(e)
        })
    })
  },
}

export default request
