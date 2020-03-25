import React, { Component } from "react";
import Header from '../../common/header'
import { getMessage } from '../../apis/My'
import './index.scss'
import { Toast} from 'antd-mobile'
import store from '../../store'

export default class Mysetting extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor (props) {
    super(props);
    this.state = {
      avatar: '',//头像
      nick_name: '',//昵称
    }
  }

  render () {
    return (
      <div id='Setting'>
        <Header title='设置'/>
        <div className='content'>
          {/* 修改头像 */}
          <div className='content_list' onClick={()=>{this.props.history.push('/Updataavatar')}}>
            {/* 左侧样式 */}
            <div className='list_left'>
              <img src={require('../../common/img/tou.png')} alt=""/>
              <span>头像</span>
            </div>
            {/* 右侧样式 */}
            <div className='list_right'>
              <img src={ this.state.avatar ? this.state.avatar : require('../../common/img/mypeople.png')} alt="" className='right_tou'/>
              <img src={ require('../../common/img/left.png')} alt="" className='right_logo'/>
            </div>
          </div>
          {/* 修改昵称 */}
          <div className='content_list' onClick={() => {this.props.history.push('/Updatanickname')}}>
            {/* 左侧样式 */}
            <div className='list_left'>
              <img src={require('../../common/img/nicheng.png')} alt=""/>
              <span>昵称</span>
            </div>
            {/* 右侧样式 */}
            <div className='list_right'>
              <span>{this.state.nick_name}</span>
              <img src={ require('../../common/img/left.png')} alt="" className='right_logo'/>
            </div>
          </div>
          {/* 退出登录 */}
          <button className='outlogin' onClick={this.outlogin}>
            退出登录
          </button>
        </div>
      </div>
    )
  }

  // 获取我的基本信息
  getmessage = async() => {
    const getMessages = await getMessage()
    if (getMessages.data.code === 200) {
      const {nick_name,avatar} = getMessages.data.data
      this.setState(() => {
        return {
          nick_name: nick_name,
          avatar: avatar
        }
      })
    }
  }
  // 退出登录
  outlogin = () => {
    this.props.history.push('/')
    Toast.success('退出成功!')
    const action = {
      type: 'outlogin',
      state: 0
    }
    store.dispatch(action)
    localStorage.clear()
  }
  // 
  componentDidMount() {
    this.getmessage()
  }
  // 
}