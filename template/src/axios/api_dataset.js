/**
 * 用户相关api
 */
import * as API from './'
import Env from './env';
const { version } = Env

export default {
  getDataset: params => {
    return API.GET(`${version}dataset`, params)
  },
  postDataset: params => {
    return API.POST(`${version}dataset`, params)
  },
  delDataset: params => {
    return API.DELETE(`${version}dataset`, params)
  },
  deleteDataset: params => {
    return API.POST(`${version}file`, params)
  },
  getDatasetImg: dataset_id => {
    return API.GET(`${version}dataset/images/${dataset_id}`)
  },
 
}
