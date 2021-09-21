import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Antd from 'ant-design-vue'
import Antd from '@/utils/configAnt'
import 'ant-design-vue/dist/antd.css'
// import TComponent from 'lego-bricks'
// import TComponent from 'px-component'
// import 'test-paxiong-component/dist/bundle.css'
import '@/http/config'

createApp(App)
  // .use(TComponent)
  .use(Antd)
  .use(store)
  .use(router)
  .mount('#app')

