import React, { Component } from "react";
import Header from '../../../common/header'
import './index.scss'
import { Sendcode } from '../../../apis/loginRegister'
import store from '../../../store'
import { edFundPwd } from '../../../apis/My'
import { Toast } from 'antd-mobile';

export default class Fundpw extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props);
    this.state = {
      zjpw: '',//资金密码
      rezjpw: '',//确认资金密码
      code: '',//验证码
      isgetcode: false,//是否点击了获取验证码
      codetimes: 60,//倒计时秒数
      stoptime: '',//停止定时器
      jieliu: true,//获取验证码节流限制
    }
  }

  render() {
    return (
      <div id='fundpw'>
        <Header title='修改资金密码' />
        <div className='content'>
          {/* 表单列表 */}
          <div className='lists'>
            <div className='lists_msg'>
              <span>资金密码</span>
              <input
                type="text"
                placeholder='请输入资金密码'
                value={this.state.zjpw}
                onChange={(e) => {
                  const value = e.target.value
                  this.setState(() => {
                    return { zjpw: value }
                  })
                }} />
            </div>
            <div className='lists_msg'>
              <span>确认密码</span>
              <input
                type="text"
                placeholder='请输入资金密码'
                value={this.state.rezjpw}
                onChange={(e) => {
                  const value = e.target.value
                  this.setState(() => {
                    return { rezjpw: value }
                  })
                }} />
            </div>
            <div className='noborder lists_msg'>
              <span>验证码 &nbsp;&nbsp;</span>
              <input
                type="text"
                placeholder='请输入验证码'
                value={this.state.code}
                onChange={(e) => {
                  const value = e.target.value
                  this.setState(() => {
                    return { code: value }
                  })
                }} />
              {(this.state.codetimes >= 60 || this.state.codetimes <= 0) ? <button onClick={() => { this.getcode() }}>获取验证码</button> : <button>{this.state.codetimes}s后再次获取</button>}

            </div>
          </div>
          {/* 确认按钮 */}
          <div
            className='surebtn'
            onClick={this.upDateBtn}>
            确认
          </div>
        </div>
      </div>
    )
  }

  // 获取验证码
  getcode = async () => {
    var tt = this.state.codetimes
    // 节流某一段时间只能点击一次
    if (this.state.jieliu) {
      this.setState(() => {
        return {
          jieliu: false
        }
      })
      // 验证码获取
      const Sendcodes = await Sendcode({
        tel: store.getState().phone,
        type: 'fund'
      })
      if (Sendcodes.data.code === 200) {
        // 倒计时
        const times = setInterval(() => {
          tt = tt - 1
          this.setState(() => {
            return {
              codetimes: tt
            }
          })
          if (tt <= 0) {
            clearInterval(times)
            // 60秒后恢复再次点击
            this.setState(() => {
              return {
                jieliu: true
              }
            })
            // 重置倒计时
            this.setState(() => {
              return {
                codetimes: 60
              }
            })
          }
        }, 1000)
        this.setState(() => {
          return {
            stoptime: times
          }
        })
      }
    }
  }
  // 提交修改
  upDateBtn = async() => {
    const edFundPwds = await edFundPwd({
      fundpwd: this.state.zjpw,
      repayfundpwd: this.state.rezjpw,
      verfication_code: this.state.code
    })
    if (edFundPwds.data.code === 200) {
      Toast.success('修改成功!')
    }
  }
  // 
  componentWillMount() {
    this.state.stoptime && clearInterval(this.state.stoptime)
  }
}