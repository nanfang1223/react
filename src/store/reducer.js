
const defaultState = {
  islogin: 0,
  token: '',
  phone: ''
}
// reducer 可以接受state数据但是不可以修改state

// state 是store上一次的数据 action是用户更改后传过来的
export default (state = defaultState, action) => {
  // state整个store
  console.log(state, action);
  if (action.type === '改变账号') {
    // 
    const newState = JSON.parse(JSON.stringify(state))
    newState.islogin = action.islogin
    return newState
  } else if(action.type === 'token') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.token = action.token
    return newState
  }else if(action.type === 'phone') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.phone = action.phone
    return newState
  }
  return state
}