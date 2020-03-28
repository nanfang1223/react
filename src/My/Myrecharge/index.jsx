import React, { Component } from "react";
import Header from  '../../common/header'
import './index.scss'
import { edAvatar,recharge,recharInfo } from '../../apis/My'
import { Toast} from 'antd-mobile';
import QRCode from 'qrcode.react'

export default class Myrecharge extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor (props) {
    super(props);
    this.state = {
      avatar: '',//截图
      rate: 0,//汇率
      address: '',//地址
      number: '',//充值金额
    }
  }

  render () {
    return (
      <div id='recharge'>
        <Header title='充值' righttext='充值记录'/>
        <div className='content'>
          {/* 充值地址 */}
          <div className='content_address'>
            {/* 二维码 */}
            <div className='address_code'>
              {/* <img src={ require('../../common/img/invcode.png')} alt=""/> */}
              <a download id='aId' title="点我下载！">
                <QRCode id='qrid' value={this.state.address} onClick={this.ClickDownLoad}/> 
              </a>
            </div>
            {/* 地址 */}
            <div className='address_title'>
              <span>充值地址</span> 
              <img src={ require('../../common/img/dingdan.png')} alt="" onClick={ () => this.copyUrl(this.state.address)}/>
            </div>
            <p>{ this.state.address }</p>
          </div>
          {/* 充值金额 */}
          <div className='rechargeMoney'>
            <span>充值金额</span>
            <input
              type="text"
              placeholder='请输入充值金额'
              value={ this.state.number}
              onChange={this.changeNum}/>
          </div>
          {/* 付款金额 */}
          <div className='rechargeMoney'>
            <span>付款金额</span>
            <p> {( Number(this.state.number) / Number(this.state.rate)).toFixed(3)} USDT</p>
          </div>
          {/* 上传支付截图 */}
          <div className='upimg'>
            <span>上传支付截图</span>
            {/* input file */}
            <div className='upimg_file'>
              <input type="file" onChange={ this.updataimg } multiple ref='fileinput'/>
              <img src={ this.state.avatar ? this.state.avatar : require('../../common/img/shizi.png') } alt=""/>
            </div>
            <p onClick={this.reupimg}>重新上传</p>
          </div>
          {/* 确定按钮 */}
          <button onClick={this.recharge}>确定</button>
        </div>
      </div>
    )
  }

 // 上传图片
 updataimg = async(e) => {
    let file = e.target.files[0];
    let param = new FormData(); // 创建form对象
    param.append("avatar", file);
    param.append("token", localStorage.token); // 通过append向form对象添加数据
    const edAvatars = await edAvatar(param)
    if (edAvatars.data.code === 200) {
      Toast.success('上传成功!')
      const { avatar,host } = edAvatars.data.data
      this.setState(() => {
        return {
          avatar: host + avatar
        }
      })
    }
  }
  // 重新上传
  reupimg = () => {
    this.refs.fileinput.click()
  }
  // 获取汇率
  recharInfo = async() => {
    const recharInfos = await recharInfo()
    if (recharInfos.data.code === 200) {
      const { rate,address } = recharInfos.data.data
      this.setState(() => {
        return {
          rate: Number(rate),
          address
        }
      })
    }
  }
  //点击复制
  copyUrl(data) {
    let url = data;
    let oInput = document.createElement("input");
    oInput.value = url;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象;
    // console.log(oInput.value);
    document.execCommand("Copy"); // 执行浏览器复制命令
    Toast.success("已成功复制到剪切板");
    oInput.remove();
  }
  // 下载二维码
  ClickDownLoad = () => {
    var Qr=document.getElementById('qrid');  
    let image = new Image();
    image.src = Qr.toDataURL("image/png");
    var a_link=document.getElementById('aId');
    a_link.href=image.src;
  }
  // changeNum
  changeNum = (e) => {
    const value = e.target.value
    this.setState(() => {
      return {
        number: value
      }
    })
  }
  // 充值
  recharge = async()  =>{
    const recharges = await recharge({
      number: Number(this.state.number / this.state.rate),
      img: this.state.avatar
    })
    // console.log(recharges);
    if (recharges.data.code === 200) {
      Toast.success('充值成功!')
    }
  }
  // 挂载后
  componentDidMount() {
    this.recharInfo()
  }
}