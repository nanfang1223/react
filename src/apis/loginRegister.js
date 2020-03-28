import fetch from '../axios/fetch'

///获取验证码
export const Sendcode = data => fetch.post( '/api/general/sendcode',data)

// 提交注册
export const Register = data => fetch.post( '/api/login/register',data)

// 提交登录
export const Login = data => fetch.post( '/api/login/doLogin',data)

// 提交忘记密码
export const Forget = data => fetch.post( '/api/login/foget',data)
