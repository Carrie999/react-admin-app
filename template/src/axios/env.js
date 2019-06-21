/*
 * 设置api请求的baseURL
 * 实际项目中建议该文件不纳入版本管理
 */

// 测试环境

let baseUrl
if( process.env.NODE_ENV === 'development') {
  baseUrl = ''
}else{
  baseUrl = ''
}
export default {
  baseURL: baseUrl,
  version : ''
}
