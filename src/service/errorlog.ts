import { messageBox } from '@/tools/message.ts'

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
export const errorHandle = (status: number, message: string) => {
  // 状态码判断
  switch (status) {
    // 400,401: 未登录状态，跳转登录页
    case 400:
    case 401:
      messageBox(`${message} 即将跳转登录页...`)
      // outLogin()
      break
    // 403 token过期 清除token并跳转登录页
    case 403:
      messageBox('登录过期，请重新登录即将跳转登录页...')
      // outLogin()
      break
    // 服务器拥堵 Bad Gateway
    case 502:
      messageBox('网络拥堵...')
      break
    // 404请求不存在
    case 404:
      messageBox('请求的资源不存在', 'error')
      break
    default:
      break
  }
}
