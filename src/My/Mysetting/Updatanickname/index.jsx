import React, { Component } from "react";
import './index.scss'
import Header from '../../../common/header'
import { edNickName } from '../../../apis/My'
import { Toast } from 'antd-mobile';

export default class Updatanickname extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor (props) {
    super(props);
    this.state = {
      nick_name: ''
    }
  }

  render () {
    return (
      <div id='nickname'>
        <Header title='修改昵称'/>
        <div className='content'>
          <div className='content_input'>
            <span>昵称</span>
            <input
              type="text"
              placeholder='请输入4-14个字符'
              maxLength='14'
              minLength='4'
              value={this.state.nick_name}
              onChange={this.changeinput}/>
            <button onClick={() => this.updatbutn()}>确认修改</button>
          </div>
        </div>
      </div>
    )
  }

  // 提交修改昵称
  updatbutn = async() => {
    if (this.state.nick_name.length < 4) {
      Toast.info('请输入4-14位昵称')
      return
    }
    const edNickNames = await edNickName({
      nick_name: this.state.nick_name
    })
    if (edNickNames.data.code === 200) {
      Toast.info('修改成功!')
      this.props.history.push('/Mysetting')
    }
  }
  // 修改昵称input
  changeinput = (e) => {
    const value = e.target.value
    this.setState(() => {
      return {
        nick_name: value
      }
    })
  }
}