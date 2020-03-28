import React, { Component } from "react";
import Header from '../../common/header'
import { fundStatus } from '../../apis/My'
import './index.scss'
export default class Securitycenter extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor (props) {
    super(props);
    this.state = {
      issetting: '',//判断是不是第一次修改资金密码 setting 是第一次
    }
  }

  render () {
    return (
      <div id='center'>
        <Header title='安全中心'/>
        <div className='content'>
          {/* 密码修改列表 */}
          <div className='lists' onClick={() => this.props.history.push('/Fundpw')}>
            {/* 左侧 */}
            <div className='lists_left'>
              <img src={require("../../common/img/zjpw.png")} alt=""/>
              <span>资金密码</span>
            </div>
            {/* 右侧 */}
            <div className='lists_right'>
              <span>{ this.state.issetting === 'setting' ? '去设置' : '去修改'}</span>
              <img src={require("../../common/img/left.png")} alt=""/>
            </div>
          </div>
          <div className='lists' onClick={()=>{this.props.history.push('/Loginpw')}}>
            {/* 左侧 */}
            <div className='lists_left'>
              <img src={require("../../common/img/loginpw.png")} alt=""/>
              <span>登录密码</span>
            </div>
            {/* 右侧 */}
            <div className='lists_right'>
              <span>去修改</span>
              <img src={require("../../common/img/left.png")} alt=""/>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 判断资金密码的状态
  fundStatus = async() => {
    const fundStatuss = await fundStatus()
    const issetting = fundStatuss.data.data.status
    if (fundStatuss.data.code === 200) {
      this.setState(() => {
        return {
          issetting
        }
      })
    }
  }

  // 挂载
  componentDidMount() {
    this.fundStatus()
  }
}