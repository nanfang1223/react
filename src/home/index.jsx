import React, { Component } from "react";

export default class  extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div id='home'>
        {/* 获取store里面的数据 */}

        { this.store.getState().phone }
      </div>
    )
  }
  // componentDidMount() {
  //   console.log(this.store.getState());
  // }
}