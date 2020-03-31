import React, { Component } from "react";
import './login.scss'
import { login } from '../apis/index'
import store from '../store'
import { Toast } from 'antd-mobile';
// import { Input } from 'antd';

// ReactDOM.render(<Input.Password placeholder="input password" />, mountNode);
export default class Login extends Component {
  static propTypes = {}
  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      accound: '',//账号
      password: '', //密码
      story: store.getState(),//获取redux数据
      isrepw: false,//是否记住密码
    }
    // console.log(this.state.story);

    // 监听store发生改变就会执行,监听函数
    store.subscribe(this.changeStore)
  }
  // const history = createHashHistory();{[require("../assets/img/2x.png")]}
  render() {
    return (
      <div id='Login'>
        {/* logo图片 */}
        <div className='logoimg'>
          <img src={require("../common/img/logo@2x.png")} alt="" />
        </div>
        <div className='contentbox'>
          <label htmlFor="账号" ><img src={require("../common/img/phone@2x.png")} alt="" /></label>
          <input
            type="text"
            placeholder='请输入账号'
            value={this.state.accound}
            onChange={this.changeInputA}
          />
        </div>
        <div className='contentbox'>
          <label htmlFor="密码"><img src={require("../common/img/loginpw.png")} alt="" /></label>
          <input
            type="text"
            placeholder='请输入密码'
            value={this.state.password}
            onChange={this.changeInputB} />
        </div>
        {/* 记住密码 */}
        <div className='resivepw' onClick={ this.chooserepw}>
          { 
          this.state.isrepw  ? <img src={require('../common/img/repw.png')} alt=""/> : <img src={require('../common/img/nopw.png')} alt=""/>}
          <span>记住密码</span>
        </div>
        <button onClick={this.isLogin}>登录</button>
      </div>
    )
  }
  // 登录请求
  isLogin = async () => {
    this.setCookie(this.state.accound, this.state.password, 2)
    const logins = await login({
      tel: this.state.accound,
      password: this.state.password
    })
    // console.log(logins);
    if (logins.data.code === 200) {
      const { token, phone } = logins.data.data
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
    const value = e.target.value
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
  // 处理cookie
  // submitForm() {
  //   //判断复选框是否被勾选 勾选则调用配置cookie方法
  //   this.setCookie(this.state.accound, this.state.password, 2)
  //   this.clearCookie();
  // }
  //设置cookie
  setCookie(c_name, c_pwd, exdays) {
    var exdate = new Date(); //获取时间
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
    //字符串拼接cookie
    window.document.cookie = "accound=" + c_name + ";path=/;expires=" + exdate.toGMTString();
    window.document.cookie = "password=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
  }
  //读取cookie
  getCookie = () => {
    if (document.cookie.length > 0) {
      var arr = document.cookie.split(';'); //这里显示的格式需要切割一下自己可输出看下
      // console.log(arr);
      arr.map( res => {
        var arr2 = res.split('='); //再次切割
        // 清除空格
        arr2[0] = arr2[0].replace(/^\s+/, '').replace(/\s+$/, '')
        //判断查找相对应的值
        if (arr2[0] === 'accound') {
          this.setState(() => {
            return {
              accound: arr2[1],
              isrepw: true
            }
          }) //保存到保存数据的地方
        } else if (arr2[0] === 'password') {
          this.setState(() => {
            return {
              password: arr2[1]
            }
          })
        }
      })
    }
  }
  //清除cookie
  clearCookie = () => {
    this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
  }
  // 切换是否记住密码
  chooserepw = ()  => {
    this.setState(() => {
      return {
        isrepw: !this.state.isrepw
      }
    })
    if (this.state.isrepw) {
      this.clearCookie()
    } else {
      this.setCookie(this.state.accound, this.state.password, 2)
    }
  }
  componentDidMount() {
    this.getCookie()
  }
  componentWillUnmount() {
    // 卸载异步操作设置状态
    this.setState = (state, callback) => {
      return;
    }
  }
}