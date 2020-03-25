import React, { Component } from "react";
import './login.scss'
import {login} from '../apis/index'
import store from '../store'
import { Toast } from 'antd-mobile';
// import { Input } from 'antd';

// ReactDOM.render(<Input.Password placeholder="input password" />, mountNode);
export default class Login extends Component {
  static propTypes = {}
  static defaultProps = {}
  
  constructor (props) {
    super(props);
    this.state = {
      accound: '',//账号
      password: '', //密码
      story: store.getState(),//获取redux数据
    }
    // console.log(this.state.story);

    // 监听store发生改变就会执行,监听函数
    store.subscribe(this.changeStore)
  }
  // const history = createHashHistory();{[require("../assets/img/2x.png")]}
  render () {
    return (
      <div id='Login'>
        {/* logo图片 */}
        <div className='logoimg'>
          <img src={require("../common/img/logo@2x.png")} alt=""/>
        </div>
        <div className='contentbox'>
          <label htmlFor="账号" ><img src={require("../common/img/phone@2x.png")} alt=""/></label>
          <input
            type="text"
            placeholder='请输入账号'
            value={this.state.accound}
            onChange={this.changeInputA}
            />
        </div>
        <div className='contentbox'>
          <label htmlFor="密码"><img src={require("../common/img/loginpw.png")} alt=""/></label>
          <input
            type="text"
            placeholder='请输入密码'
            value={this.state.password}
            onChange={this.changeInputB}/>
        </div>
        {/* <Input></Input> */}
        <button onClick={this.isLogin}>登录</button>
      </div>
    )
  }
  // 登录请求
   isLogin = async ()=> {
    const logins = await login({
      tel: this.state.accound,
      password: this.state.password
    })
    // console.log(logins);
    if (logins.data.code === 200) {
      const { token,phone } = logins.data.data
      // 将数据保存到redux
      const action = {
        type: 'token',
        token: token
      }
      store.dispatch(action)
      const aphone = {
        type: 'phone',
        phone: phone
      }
      store.dispatch(aphone)
      
      const foot = {
        type: '底部切换',
        footTab: 1
      }
      store.dispatch(foot)
      Toast.info(logins.data.message)
      this.props.history.push('/home')
    }
  }

  changeInputA = (e) => {
    console.log(e);
    const value = e.target.value
    // 
    const action = {
      type: '改变账号',
      islogin: e.target.value
    }
    // dispatch 将数据改变传给store
    store.dispatch(action)
    // console.log(this.state.story);
    this.setState(() => {
      return {
        accound: value
      }
    })
  }
  changeInputB = (e) => {
    const value = e.target.value
    this.setState(() => {
      return {
        password: value
      }
    })
  }
  // 
  changeStore = () => {
    //  console.log(store.getState());
    this.setState(store.getState())
  }
  componentWillUnmount(){
    // 卸载异步操作设置状态
      this.setState = (state, callback) => {
        return;
      }
  }
}