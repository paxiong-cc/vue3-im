import { createStore } from 'vuex'
import { GlobalDataProps } from './interfaces'
import user from './modules/user'
import template from './modules/template'
import editor from './modules/editor'

const store = createStore<GlobalDataProps>({
  modules: {
    user,
    template,
    editor
  }
})

export default store
