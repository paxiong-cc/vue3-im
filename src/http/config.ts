import axios from 'axios'

axios.interceptors.request.use(config => {
  return config
})

axios.interceptors.response.use(resp => {
  return resp
})