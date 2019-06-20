/**
 * 用户相关api
 */
import * as API from './'

export default {
  getProject: params => {
    return API.GET('/ocr/v1/project', params)
  },
  getProjectOne: id => {
    return API.GET(`/ocr/v1/project/${id}`)
  },
  postProject: params => {
    return API.POST('/ocr/v1/project', params)
  },
  delProject: params => {
    return API.DELETE('/ocr/v1/project', params)
  },
  putProject: params => {
    return API.PUT('/ocr/v1/project', params)
  },

}
