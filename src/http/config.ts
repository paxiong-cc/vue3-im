import axios from 'axios'

axios.defaults.baseURL = 'http://www.paxiong.top'

axios.interceptors.request.use(config => {
  return config
})

axios.interceptors.response.use(resp => {
  return resp
})
