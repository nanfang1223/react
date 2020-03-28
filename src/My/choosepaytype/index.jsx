import React, { Component } from "react";
import './index.scss'
import Header from '../../common/header'

export default class Choosepaytype extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor (props) {
    super(props);
    this.state = {}
  }

  render () {
    return (
      <div id='paytype'>
        <Header title='收款方式'/>
      </div>
    )
  }
}