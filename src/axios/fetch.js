import axios from 'axios'
import { Toast } from 'antd-mobile';
import store from '../store/index'

// 请求拦截
// axios.interceptors.request.use(config => {
//   if (oCookie.get(['token']).token) {
//     config.headers.token = oCookie.get(['token']).token
//   }
//   return config
// }, error => {
//   return Promise.reject(error)
// })

axios.interceptors.response.use(response => {
  // console.log(response,'response')
  return response
}, err => {
  return Promise.resolve(err.data)
})

// axios.defaults.baseURL = process.env.VUE_APP_MOCK_URL
//自动切换环境
// if (process.env.NODE_ENV === 'development'){
//   axios.defaults.baseURL = '/api';
// } else if (process.env.NODE_ENV === 'debug'){
//   axios.defaults.baseURL = '/api';
// } else if (process.env.NODE_ENV === 'production') { 
//   axios.defaults.baseURL = 'http://***********/';
// }
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 15000

const resHandle = (res, resolve) => {
  if (res.data.code === 300) { // token过期
    Toast.info(res.data.message)
    store.getState().isprops.history.push('/')
    sessionStorage.clear()
    resolve(res)
  } else if (res.data.code === 400) {
    Toast.fail(res.data.message)
    resolve(res)
  } else if (res.data === null) {
    resolve()
  } else if (res.data.code === 200) {
    resolve(res)
  } else {
    resolve(res)
  }
}
// axios的请求方法  get 、 post 、put 、patch 、delete
//put： 更新数据（将所有的数据都推送到后端）
//patch： 更新数据（只将修改的数据推送到后端）
//delete：删除数据
//请求方式
export default {
  
  get(url, params= {}) {
    return new Promise((resolve) => {
      axios({
        method: 'get',
        url: url,
        data: params,
        headers: {
          token: store.getState().token
        }
      }).then(response => {
        resHandle(response, resolve)
      }).catch(() => {
        Toast.info('服务器未响应哦~')
      })
    })
  },
  post(url, params = {}) {
    return new Promise((resolve) => {
      axios({
        method: 'post',
        url,
        data: params,
        headers: {
          token: store.getState().token
        }
      }).then(response => {
        resHandle(response, resolve)
      }).catch(() => {
        Toast.info('服务器未响应哦~')
      })
    })
  }
}

