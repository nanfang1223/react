import React, { Component } from "react";
import Header from '../../../common/header'
import './index.scss'

export default class Addzfb extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor (props) {
    super(props);
    this.state = {}
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
              <img src={require('../../../common/img/shizi.png')} alt=""/>
              <input type="file"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}