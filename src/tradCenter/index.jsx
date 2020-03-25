import React, { Component } from "react";
import Footer from '../common/footer'

export default class Tradcenter extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor (props) {
    super(props);
    this.state = {}
  }

  render () {
    return (
      <div>
        我是交易中心页面
        {/* history ={this.props.history} 传递给自组件*/}
        <Footer history ={this.props.history}/>
      </div>
    )
  }
}