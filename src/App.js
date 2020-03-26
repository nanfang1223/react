import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import 'antd/dist/antd.css'
import './common/common.css'
import 'antd-mobile/dist/antd-mobile.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import DOM from './common/DOM/DOM'

import Login from './login/index'//登录页面
import Home from './home/index'//首页
import My from './My/index'//我的页面
import Tradcenter from './tradCenter/index'//交易中心页面
import Playcenter from './playCenter/index'//游戏中心页面
import Mysetting from './My/Mysetting'//我的页面-设置
import Updatanickname from './My/Mysetting/Updatanickname'//我的页面-设置-修改昵称
import Updataavatar from './My/Mysetting/Updataavatar'//我的页面-设置-修改头像
import Totalasset from './My/Myasset/totalAssets' //我的页面-总资产详情

function App() {
  return (
    <Router>
    <div className="App">
      {/* DOM */}
      <Route exact path='/DOM' component={DOM}></Route>
      {/* 登录 */}
      <Route exact path='/' component={Login}></Route>
      {/* 首页 */}
      <Route exact path='/home' component={Home}></Route>
      {/* 我的 */}
      <Route exact path='/my' component={My}></Route>
      {/* 交易中心 */}
      <Route exact path='/Tradcenter' component={Tradcenter}></Route>
      {/* 娱乐中心 */}
      <Route exact path='/Playcenter' component={Playcenter}></Route>
      {/* 我的页面-设置 */}
      <Route exact path='/Mysetting' component={Mysetting}></Route>
      {/* 我的页面-设置-修改昵称 */}
      <Route exact path='/Updatanickname' component={Updatanickname}></Route>
      {/* 我的页面-设置-修改头像 */}
      <Route exact path='/Updataavatar' component={Updataavatar}></Route>
      {/* 我的页面-总资产详情 */}
      <Route exact path='/Totalasset' component={Totalasset}></Route>
    </div>
    </Router>
  );
}

export default App;
