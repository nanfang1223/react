import React, { Component } from "react";
import Footer from '../common/footer'
import { getMessage,allTotal } from '../apis/My'
import store from '../store'
import './index.scss'

export default class My extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor (props) {
    super(props);
    this.state = {
      avatar: '',//获取头像
      level: '无',//注册账号等级
      total_assets_total: 0,//总资产
      accumulated_income_total: 0,//累计收益
      promotional_benefits_total: 0,//推广收益
      team_profit_toal: 0,//团队收益
      nick_name: '',//昵称
    }
  }

  render () {
    return (
      <div id='My'>
        {/* 设置按钮 */}
        <div className='settingimg' onClick={() => this.Topage('setting')}>
          <img src={ require('../common/img/mysetting.png')} alt=""/>
        </div>
        {/*  我的页面具体内容 */}
        <div className='contents'>
          {/* 头部展示信息 */}
          <div className='content_top'>
            {/* 展示账号信息 */}
            <div className='content_top_accound'>
              {/* 头像 */}
              <div className='accound_img'>
                <img src={ this.state.avatar ? this.state.avatar : require('../common/img/tou1.png') } alt=""/>
              </div>
              {/* 账号展示 */}
              <div className='accound_message'>
                <p className='message_name'>昵称: { this.state.nick_name }<span> { this.state.level } </span></p>
                <p>手机号: { store.getState().phone}</p>
              </div>
            </div>
            {/* 资产收益展示 */}
            <div className='content_top_money'>
              <ul>
                <li onClick={()=> this.Topage('Totalasset')}>
                  <span>{ this.state.total_assets_total }</span>
                  <p>总资产</p>
                </li>
                <li>
                  <span>{ this.state.accumulated_income_total }</span>
                  <p>累计收益</p>
                </li>
                <li>
                  <span>{ this.state.promotional_benefits_total }</span>
                  <p>推广收益</p>
                </li>
                <li>
                  <span>{ this.state.team_profit_toal }</span>
                  <p>团队收益</p>
                </li>
              </ul>
            </div>
          </div>
          {/* 功能列表1 */}
          <div className='contents_list1'>
            <ul>
              <li>
                <div className='list_logo'>
                  <img src={require('../common/img/myshenshou.png')} alt=""/>
                </div>
                <span>我的神兽</span>
                <img src={ require('../common/img/right.png')} alt="" className='right_logo'/>
              </li>
              <li>
                <div className='list_logo'>
                  <img src={require('../common/img/mychongbi.png')} alt=""/>
                </div>
                <span>充币</span>
                <img src={ require('../common/img/right.png')} alt="" className='right_logo'/>
              </li>
              <li className='clearboder'>
                <div className='list_logo'>
                  <img src={require('../common/img/mytibi.png')} alt=""/>
                </div>
                <span>提现</span>
                <img src={ require('../common/img/right.png')} alt="" className='right_logo'/>
              </li>
            </ul>
          </div>
          {/* 功能列表2 */}
          <div className='contents_list1'>
            <ul>
              <li>
                <div className='list_logo'>
                  <img src={require('../common/img/myteam.png')} alt=""/>
                </div>
                <span>我的团队</span>
                <img src={ require('../common/img/right.png')} alt="" className='right_logo'/>
              </li>
              <li>
                <div className='list_logo'>
                  <img src={require('../common/img/myyaoqing.png')} alt=""/>
                </div>
                <span>邀请好友</span>
                <img src={ require('../common/img/right.png')} alt="" className='right_logo'/>
              </li>
              <li>
                <div className='list_logo'>
                  <img src={require('../common/img/mycard.png')} alt=""/>
                </div>
                <span>收款方式</span>
                <img src={ require('../common/img/right.png')} alt="" className='right_logo'/>
              </li>
              <li>
                <div className='list_logo'>
                  <img src={require('../common/img/gonggao.png')} alt=""/>
                </div>
                <span>查看公告</span>
                <img src={ require('../common/img/right.png')} alt="" className='right_logo'/>
              </li>
              <li>
                <div className='list_logo'>
                  <img src={require('../common/img/myshiming.png')} alt=""/>
                </div>
                <span>实名认证</span>
                <img src={ require('../common/img/right.png')} alt="" className='right_logo'/>
              </li>
              <li className='clearboder'>
                <div className='list_logo'>
                  <img src={require('../common/img/myanquan.png')} alt=""/>
                </div>
                <span>安全中心</span>
                <img src={ require('../common/img/right.png')} alt="" className='right_logo'/>
              </li>
            </ul>
          </div>
        </div>
        {/* history ={this.props.history} 传递给自组件*/}
        <Footer history ={this.props.history}/>
      </div>
    )
  }

  // 获取账号详细信息
  getAccoundMessage = async() => {
    const getMessages = await getMessage() 
    if (getMessages.data.code === 200) {
      const {avatar,level,nick_name} = getMessages.data.data
      // 修改state的值
      this.setState(()=>{
        return {
          avatar: avatar,
          level: level,
          nick_name: nick_name
        }
      })
    }
  }

  // 收益数据列表
  allTotals = async() => {
    const allTotals = await allTotal()
    // console.log(allTotals);
    const {total_assets_total,accumulated_income_total,promotional_benefits_total,team_profit_toal} = allTotals.data.data
    this.setState(()=> {
      return {
        total_assets_total:total_assets_total,
        accumulated_income_total:accumulated_income_total,
        promotional_benefits_total: promotional_benefits_total,
        team_profit_toal: team_profit_toal
      }
    })
  }
  // 页面跳转
  Topage = (e) => {
    if (e === 'setting') {
      this.props.history.push('/Mysetting')
    } if (e === 'Totalasset') {
      this.props.history.push('/Totalasset')
    }
  }
  componentDidMount() {
    // 获取账号详细信息
    this.getAccoundMessage()
    // 收益数据列表
    this.allTotals()
  }

  // 
  componentWillUnmount(){
    // 卸载异步操作设置状态
      this.setState = (state, callback) => {
        return;
      }
  }
}