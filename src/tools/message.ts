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
