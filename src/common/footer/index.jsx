import React, { Component } from "react";
import store from '../../store'
import './index.scss'

// @withRouter
export default class Footer extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor (props) {
    super(props);
    this.state = {
      story: store.getState(),//获取redux数据
    }

    const action = {
      type: 'props',
      isprops: this.props
    }
    store.dispatch(action)
    // 监听store发生改变就会执行,监听函数
    store.subscribe(this.changeStore)
  }

  render () {
    return (
      <div id='footer'>
        <ul>
          {/* 注意函数传参数的时候如果直接使用 this.changeTab(1) 那么该函数会在渲染的时候就执行不会再点击的时候才触发, 可以通过一下箭头函数的形式 */}
          <li onClick = {() => this.changeTab(1)}>
            { this.store.getState().footTab === 1 ? <img src={ require('../img/home1.png')} alt=""/> : <img src={ require('../img/home.png')} alt="" />}
          </li>
          <li onClick = {() => this.changeTab(2)}>
          { this.store.getState().footTab === 2 ? <img src={ require('../img/exchange1.png')} alt=""/> : <img src={ require('../img/exchange.png')} alt="" />}
            </li>
          <li onClick = {() => this.changeTab(3)}>
          { this.store.getState().footTab === 3 ? <img src={ require('../img/play1.png')} alt=""/> : <img src={ require('../img/play.png')} alt="" />}
          </li>
          <li onClick = {() => this.changeTab(4)}>
          { this.store.getState().footTab === 4 ? <img src={ require('../img/mine1.png')} alt=""/> : <img src={ require('../img/mine.png')} alt="" />}
          </li>
        </ul>
      </div>
    )
  }

  // 切换底部切换方法
  changeTab = async(e) => {
    
    const action = {
      type : '底部切换',
      footTab: e
    }
    store.dispatch(action)

    // 在子组件使用this.props.history.push 需要在父级将history传递过来
    if (e === 1) {
      this.props.history.push('/home')
    } else if (e === 4) {
      this.props.history.push('/my')
    } else if (e === 2) {
      this.props.history.push('/Tradcenter')
    } else if (e === 3) {
      this.props.history.push('/Playcenter')
    }
  }
  //当redux的数据发生变化执行该函数
  changeStore = () => {
    // 只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染。
    this.setState(store.getState())
  }
  // 解决 我们不能在组件销毁后设置state，防止出现内存泄漏的情况
  // componentWillUnmount生命周期的应用场景一般是用来事件解除绑定，或者清理页面缓存。本人就遇到过这样一个问题，父子组件都连接着redux，因为页面应用越来越大，redux的性能变的越来越差，这时就要借助componentWillUnmount在组件卸载的同时，对相关的redux所缓存的数据进行初始化，以减轻内存压力。因为设计不合理，在redux里面父子组件的数据有了关联性，当开始性能优化的时候，出现画面抖动和瞬间显示异样的情况。在原先设想下，如果从数据末端初始化是没有任何问题的，但是因为没有认真了解componentWillUnmount的执行顺序，产生了bug。虽然问题通过redux数据扁平化解决掉了，但是仍然认为componentWillUnmount的执行顺序需要有足够的了解和重视。
  componentWillUnmount(){
    // 卸载异步操作设置状态
      this.setState = (state, callback) => {
        return;
      }
  }
}