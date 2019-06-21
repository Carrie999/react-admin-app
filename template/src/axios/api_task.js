/**
 * 项目相关api
 */
import * as API from './'
import Env from './env';
const { version } = Env

export default {
  getTask: params => {
    return API.GET(``, params)
  },
}

