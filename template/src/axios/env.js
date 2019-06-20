/*
 * 设置api请求的baseURL
 * 实际项目中建议该文件不纳入版本管理
 */

let baseUrl= 'http://10.60.242.105:12100/';
// baseUrl = 'http://10.60.242.105:12100/'
// if(urlStr.indexOf('master')>0){
//   baseUrl = 'http://10.60.242.105:12100/'
// }else{
//   baseUrl = 'http://10.60.242.105:12100/'
// }


export default {
  baseURL: baseUrl,
  version : '/ocr/v1/'
}
