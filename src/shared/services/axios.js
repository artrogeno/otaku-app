import axios from 'axios'
import { ROUTE, STORAGE, TOKEN } from '@constants/index'

const instance = axios.create({
  baseURL: ROUTE.BASE_URL,
})

instance.interceptors.request.use(
  function(config) {
    // const token = localStorage.getItem(STORAGE.AUTH_TOKEN)
    // if (token) {
    //   config.headers.Authorization = `jwt ${token}`
    // }
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (!error.response) return

    const { message } = error.response.data

    if (message === TOKEN.EXPIRED) {
      localStorage.removeItem(STORAGE.AUTH_TOKEN)
      localStorage.removeItem(STORAGE.AUTH_EXPIREAT)
      localStorage.setItem(STORAGE.AUTH_REDIRECT, true)
      window.location.href = ROUTE.LOGIN
    }
    return Promise.reject(error)
  }
)

export default instance
