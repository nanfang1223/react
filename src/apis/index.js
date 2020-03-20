import fetch from '../axios/fetch'

export const login = data => fetch.post( 'http://www.xuanwuplan.com/api/login/doLogin',data)