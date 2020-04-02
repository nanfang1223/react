import React, { Component } from "react";
import Header from '../../../common/header'
import './index.scss'
import Upimg from '../../../common/updateimg'

export default class Addzfb extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor (props) {
    super(props);
    this.state = {
      zfbimg: '',//支付码
    }
  }

  render () {
    return (
      <div id='addzfb'>
        <Header title='添加支付宝'/>
        <div className='content'>
          {/* 支付宝信息 */}
          <div className='content_msg'>
            <div className='msg_list'>
              <span>姓名</span>
              <input type="text" placeholder='请输入真实姓名'/>
            </div>
            <div className='msg_list'>
              <span>支付宝账号</span>
              <input type="text" placeholder='请输入支付宝账号'/>
            </div>
          </div>
          {/* 收款码 */}
          <div className='content_code'>
            <div className='code_title'>
              <span>收款码</span>
              <p>重新上传</p>
            </div>
            <div className='upimg'>
              <img src={this.state.zfbimg ? this.state.zfbimg : require('../../../common/img/shizi.png')} alt=""/>
              <input type="file" onChange={this.upimgs}/>
            </div>
          </div>
          {/* 手机验证码 */}
          <div className='phonecode'>
            <input type="text" placeholder='请输入验证码'/>
            <button>获取手机验证码</button>
          </div>
          {/* 确认按钮 */}
          <button className='surebtn'>确认添加</button>
        </div>
      </div>
    )
  }

  // 上传图片
  upimgs = async(e) => {
    const imgurl = await Upimg.upimg(e)
    this.setState(() => {
      return {
        zfbimg: imgurl.host + imgurl.avatar
      }
    })
  }
}