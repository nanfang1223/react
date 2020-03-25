
const defaultState = {
  islogin: 0,
  token: '',//存储token
  phone: '',//存储账号
  footTab: 1,//存储底部切换,1首页,2交易中心,3娱乐中心,4我的
  isprops: '',//存储路由跳转history
}
// reducer 可以接受state数据但是不可以修改state

// state 是store上一次的数据 action是用户更改后传过来的
export default (state = defaultState, action) => {
  // state整个store
  // console.log(state, action);
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
  }else if(action.type === '底部切换') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.footTab = action.footTab
    return newState
  }else if (action.type === 'props') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.isprops = action.isprops
    return newState
  }else if (action.type === 'outlogin') {
    var newState = JSON.parse(JSON.stringify(state))
    newState = undefined
    return newState
  }
  return state
}