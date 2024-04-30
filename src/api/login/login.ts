import request from '@/service/request'

/**
 * 登录接口
 * @param account
 */
export function login(account: any) {
  return request.post('/login', account)
}
