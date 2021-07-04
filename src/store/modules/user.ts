import { Module } from 'vuex'
import { GlobalDataProps, UserProps } from '../interfaces'

const user: Module<UserProps, GlobalDataProps> = {
  state: {
    isLogin: false,
    userName: ''
  },
  mutations: {
    login(state) {
      state.isLogin = true
      state.userName = 'paxiong'
    },
    logout(state) {
      state.isLogin = false
    }
  }
}

export default user
