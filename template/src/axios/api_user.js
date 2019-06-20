/**
 * 用户相关api
 */
import * as API from './'
import Env from './env';
const { version } = Env

export default {
  login: params => {
    return API.POST('/login', params)
  },
  signOut: () => {
    return API.GET('/logout')
  },
  register: params => {
    return API.POST('/register', params)
  },
  resetPW: params => {
    return API.POST('/forget_password', params)
  },
  usersAdd: params => {
    return API.POST(`${version}user/add`, params)
  },
  usersEdit: (user_id, params) => {
    return API.POST(`${version}user/edit/${user_id}`, params)
  },
  usersEditPW: (params) => {
    return API.POST(`${version}user/edit_password`, params)
  },
  usersDel: user_id => {
    return API.POST(`${version}user/delete/${user_id}`)
  },
  sendCaptcha: params => {
    return API.POST(`${version}message/verify_code`, params)
  },
  getUsers: params => {
    return API.GET(`${version}user/list`, params)
  },
  getUsersRoles: () => {
    return API.GET(`${version}user/roles`)
  },
  getUserOne: user_id => {
    return API.GET(`${version}user/look/${user_id}`)
  },
  getInviteCode: () => {
    return API.GET(`${version}invite_code`)
  },
 

}
