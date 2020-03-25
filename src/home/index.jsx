import React, { Component } from "react";
import Footer from '../common/footer'
import './index.scss'

export default class Home extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor (props) {
    super(props)
    this.state = {}
  }
// react 生命周期介绍Could not proxy request 
  render () {
    return (
      <div id='home'>
        {/* 获取store里面的数据 */}

        {/* { this.store.getState().phone } */}
        {/* <button onClick= { this.outlogin}>退出登录</button> */}
        {/* 顶部banner */}
        <div className='header'>
          <img src={require('../common/img/header.png')} alt=""/>
        </div>
        {/* 汇率公告 */}
        <div className='message'>
          <p>今日币价: 1GBC = 7CNY</p>
          <div className='notice'>
            {/* <img src={'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584969136350&di=64a8ddd14028114ccfcad04ebb143213&imgtype=0&src=http%3A%2F%2Fimg.qqzhi.com%2Fuploads%2F2018-11-30%2F064504175.jpg'} alt=""/>c此种写法成立 */}
            <img src={ require('../common/img/notice.png') } alt=""/>
            <marquee>到今晚才看见我无奈了无奈了</marquee>
          </div>
          
        </div>
        {/* 底部模块 */}
        <Footer history ={this.props.history}/>
      </div>
    )
  }
  // 退出登录
  outlogin = () => {
    // alert(1)
    sessionStorage.clear()
  }
}