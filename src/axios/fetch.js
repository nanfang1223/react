import axios from 'axios'
import { qsStringify } from '../axios/common'
import { oCookie } from '../axios/common'
import { Toast } from 'antd-mobile';
// import MyAlert from '../components/MyAlert/index'
// import router from '@/router'

// 请求拦截
axios.interceptors.request.use(config => {
  if (oCookie.get(['token']).token) {
    config.headers.token = oCookie.get(['token']).token
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  // console.log(response,'response')
  return response
}, err => {
  return Promise.resolve(err.data)
})

// axios.defaults.baseURL = process.env.VUE_APP_MOCK_URL
//自动切换环境
if (process.env.NODE_ENV === 'development'){
  axios.defaults.baseURL = '/apis';
} else if (process.env.NODE_ENV === 'debug'){
  axios.defaults.baseURL = '/apis';
} else if (process.env.NODE_ENV === 'production') { 
  axios.defaults.baseURL = 'http://***********/';
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 15000

const resHandle = (res, resolve) => {
  // console.log(res,resolve)
  if (res.data.code === 300) { // token过期
    // router.replace('/')
    // alert(res.data.message)
    Toast.info(res.data.message)
    this.props.history.push('/')
    resolve(res)
  } else if (res.data.code === 400) { // 
    // this.props.history.push('/')
    // alert(res.data.message)
    Toast.info(res.data.message)
    resolve(res)
  } else if (res.data === null) {
    // MyAlert('接口返回数据为空！')
    resolve()
  } else if (res.data.code === 200) {
    // console.log('success')
    resolve(res)
  } else {
    // MyAlert(res.msg)
    resolve(res)
  }
}
// axios的请求方法  get 、 post 、put 、patch 、delete
//put： 更新数据（将所有的数据都推送到后端）
//patch： 更新数据（只将修改的数据推送到后端）
//delete：删除数据
export default {
  get(url, params= {}) {
    return new Promise((resolve) => {
      axios({
        method: 'get',
        url,
        params
      }).then(response => {
        resHandle(response, resolve)
      })
    })
  },
  post(url, params = {}) {
    return new Promise((resolve) => {
      axios({
        method: 'post',
        url,
        data: qsStringify(params)
      }).then(response => {
        resHandle(response, resolve)
      })
    })
  },
  postJson(url, params = {}) {
    return new Promise((resolve) => {
      axios({
        method: 'post',
        url,
        data: params
      }).then(response => {
        resHandle(response, resolve)
      })
    })
  },
  file(url, params = {}) {
    const Form = new FormData()
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        Form.append('file', params[key])
      }
    }
    return new Promise((resolve) => {
      axios({
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method: 'post',
        url,
        data: Form
      }).then(response => {
        resHandle(response.data, resolve)
      })
    })
  }
}

