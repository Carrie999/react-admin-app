/**
 * Created by Carrie.
 */
import Env from './env';
import axios from 'axios'


axios.defaults.withCredentials = true;
//基地址
// let base = Env.baseURL;

const instance = axios.create({
  baseURL: Env.baseURL,
  timeout: 30000
});





//通用方法
export const POST = (url, params) => {
  return instance.post(url, params).then(res => res.data)
}
export const GET = (url, params) => {
  if(!params){
    return instance.get(url).then(res => res.data)
  }
  return instance.get(`${url}?${params}`).then(res => res.data)
}

export const PUT = (url, params) => {
  return instance.put(url, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return instance.delete(url, {data: params}).then(res => res.data)
}

// export const PATCH = (url, params) => {
//   return instance.patch(url, params).then(res => res.data)
// }




// export const GETCONFIG = (url, params) => {
//   return instance.get(`${url}`,{data: params}).then(res => res.data)
// }
