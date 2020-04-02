import React, { Component } from "react";
import './index.scss'
import Header from '../../common/header'
import { bankpayinfo, alipayinfo } from '../../apis/My'

export default class Choosepaytype extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props);
    this.state = {
      isband: 0,//是否有绑定方式
      binklists: [],//银行卡列表
      alilists: [],//支付宝列表
    }
  }

  render() {
    return (
      <div id='paytype'>
        <Header title='收款方式' />
        <div className='content'>
          {/* 内容展示 */}
          {
            this.state.isband ? this.havetypemode() : this.notypemode()
          }
          {/* 添加付款方式按钮 */}
          <button
            className='addbtn'
            onClick={() => this.props.history.push('/Addpaytype')}>
              <img src={require('../../common/img/addround.png')} alt="" />
              <span>添加付款方式</span>
          </button>
        </div>
      </div>
    )
  }

  // 暂无绑定方式模块
  notypemode = () => {
    return (
      <div className='notype'>
        <img src={require("../../common/img/nodata.png")} alt="" />
        <p>还没有支付方式,快去添加!</p>
      </div>
    )
  }

  // 存在绑定方式模块
  havetypemode = () => {
    return (
      <div className='havetype'>
        <div className='lists'>
          {
            this.state.binklists.length !== 0 ? <ul className='list_message'>
              {
                this.state.binklists.map((item,index) => {
                  
                 return (
                  <li key={index}>
                    <img src={require('../../common/img/cards.png')} alt="" />
                    <span>银行卡</span>
                  </li>
                 )
                })
              } 
            </ul> : ''
          }
          {
            this.state.alilists.length !== 0 ? <ul className='list_message'>
              <li>
                <img src={require('../../common/img/zfb.png')} alt="" />
                <span>支付宝({this.state.alilists.number})</span>
              </li>
            </ul> : ''
          }
        </div>
      </div>
    )
  }
  // 获取绑定支付宝信息// 获取绑定银行卡信息
  alipayinfo = async () => {
    const alipayinfos = await alipayinfo()
    if (alipayinfos.data.code === 200) {
      this.setState(() => {
        return {
          alilists: alipayinfos.data.data
        }
      })
    }
    const bankpayinfos = await bankpayinfo()
    if (bankpayinfos.data.code === 200) {
      this.setState(() => {
        return {
          binklists: bankpayinfos.data.data
        }
      })
    }
  }
  // 挂载之后
  componentDidMount() {
    this.alipayinfo().then((res) => {
      // console.log(res);
      if (this.state.binklists.length !== 0 || this.state.alilists.length !== 0) {
        this.setState(() => {
          return {
            isband: 1
          }
        })
      }
    })
  }
}