import { createStore } from 'vuex'
import { GlobalDataProps } from './interfaces'
import user from './modules/user'
import template from './modules/template'

const store = createStore<GlobalDataProps>({
  modules: {
    user,
    template
  }
})

export default store
