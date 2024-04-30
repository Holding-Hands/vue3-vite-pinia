/**
 * @desc 函数
 * @param msg 显示文字
 * @param type 提示类型
 */
export const messageBox = (msg: string, type?: any) => {
  ElMessage({
    message: msg,
    type: type || 'warning',
    duration: 2000,
  })
}

/**
 * 处理和显示错误消息
 * @param error 错误对象，可以是任何类型
 */
export function handleError(error: unknown, message = '发生未知错误!'): void {
  if (error instanceof Error) {
    // 如果是 Error 实例，显示错误的 message
    ElMessage.error(error.message || message)
  } else {
    // 如果不是 Error 实例，显示一个通用的错误消息
    ElMessage.error(message)
  }
}

// 定义异步操作的类型。它接受任意参数并返回一个 Promise。
// eslint-disable-next-line no-unused-vars
type AsyncOperation<T = any> = (...args: any[]) => Promise<T>

/**
 * 一个封装的 try-catch 函数 通常用于请求接口使用
 * @param operation
 * @param params
 */
export async function handleAsyncOperation<T = any>(operation: AsyncOperation<T>, ...params: any[]): Promise<T | null> {
  try {
    const result = await operation(...params)
    return result
  } catch (error: unknown) {
    // 错误处理，根据错误类型显示消息
    handleError(error)
    return null
  }
}
