/**
 * 用户相关api
 */
import * as API from './'
import Env from './env';
const { version } = Env

export default {
  getProjects: () => {
    return API.GET(`${version}options?option=projects`)
  },
  getDatasets: () => {
    return API.GET(`${version}options?option=datasets`)
  },
  postTraining: params => {
    return API.POST(`${version}training/task`, params)
  },
  
}
