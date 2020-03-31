import React, { Component } from "react";
import Header from '../../../common/header'
import './index.scss'

export default class Addpaytype extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor (props) {
    super(props);
    this.state = {}
  }

  render () {
    return (
      <div id='addpaytype'>
        <Header title='添加支付方式'/>
        <div className='content'>
          <div className='content_msg'>
            <img src={require('../../../common/img/cards.png')} alt=""/>
            <span>银行卡</span>
            <p>去添加</p>
          </div>
          <div className='content_msg'>
            <img src={require('../../../common/img/zfb.png')} alt=""/>
            <span>支付宝</span>
            <p onClick={() => this.props.history.push('/Addzfb')}>去添加</p>
          </div>
        </div>
      </div>
    )
  }
}