import React, { Component } from "react";
import Header from '../../../common/header'
import './index.scss'
// import { edAvatar } from '../../../apis/My'
// import { Toast } from 'antd-mobile';
import Upimg from '../../../common/updateimg'

export default class Updataavatar extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',//选择头像
    }
  }

  render() {
    return (
      <div id='updateavatar'>
        <Header title='修改头像' />
        <div className='content'>
          <div className='content_avatar'>
            <img src={this.state.avatar ? this.state.avatar : require('../../../common/img/shizi.png')} alt="" />
            <input
              type="file"
              onChange={this.updataimg}
              multiple />
          </div>

        </div>
      </div>
    )
  }

  genData = () => {
    const dataArr = [];
    for (let i = 0; i < 20; i++) {
      dataArr.push(i);
    }
    return dataArr;
  }

  // 上传图片
  updataimg = async (e) => {
    const imgurl = await Upimg.upimg(e)
    // console.log(imgurl);
    this.setState(() => {
      return {
        avatar: imgurl.host + imgurl.avatar
      }
    })

  }
}