import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { useEnv } from './hooks'
import { errorHandle } from './errorlog'

const { VITE_BASE_API } = useEnv()

const service: AxiosInstance = axios.create({
  baseURL: VITE_BASE_API,
  timeout: 10 * 1000, // 请求超时时间
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
})

// 请求拦截
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // 这里可以设置token: config!.headers!.Authorization = token
  console.log(config)
  return config
})

// 响应拦截
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const data = response.data
    if (data.code === 200) {
      return data
    } else {
      return Promise.reject(data)
    }
  },
  (error) => {
    const { response } = error
    errorHandle(response.status, response.data.message)
    return Promise.reject(error.response)
  }
)

export default service
