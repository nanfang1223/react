import fetch from '../axios/fetch'

export const login = data => fetch.post( '/api/login/doLogin',data)