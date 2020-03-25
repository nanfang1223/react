import React, { Component } from "react";
import Header from '../../../common/header'
import './index.scss'
import { edAvatar } from '../../../apis/My'
import { Toast} from 'antd-mobile';

export default class Updataavatar extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor (props) {
    super(props);
    this.state = {
      avatar: '',//选择头像
    }
  }

  render () {
    return (
      <div id='updateavatar'>
        <Header title='修改头像'/>
        <div className='content'>
          <div className='content_avatar'>
            <img src={ this.state.avatar ? this.state.avatar : require('../../../common/img/shizi.png') } alt=""/>
            <input
              type="file"
              onChange={this.updataimg}
              multiple/>
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
  updataimg = async(e) => {
      let file = e.target.files[0];
      let param = new FormData(); // 创建form对象
      param.append("avatar", file);
      param.append("token", localStorage.token); // 通过append向form对象添加数据
      // let config = {headers:{'Content-Type':'multipart/form-data'}} // 添加请求头
      const edAvatars = await edAvatar(param)
      if (edAvatars.data.code === 200) {
        // this.$layer.msg('上传成功!')
        Toast.success('上传成功!')
        const { avatar,host } = edAvatars.data.data
        this.setState(() => {
          return {
            avatar: host + avatar
          }
        })
        // console.log(this.state.avatar);
      }
  }
}