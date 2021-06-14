import { Module } from 'vuex'
import { GlobalDataProps, UserProps } from '../interfaces'

const user: Module<UserProps, GlobalDataProps> = {
  mutations: {
    login(state) {
      state.isLogin = true
      state.userName = 'viking'
    },
    logout(state) {
      state.isLogin = false
    }
  }
}

export default user
