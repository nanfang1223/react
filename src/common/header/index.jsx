import React, { Component } from "react";
import store from '../../store'
import './index.scss'

export default class Header extends Component {
  static propTypes = {}
  static defaultProps = {}
  constructor (props) {
    super(props);
    this.state = {
      historys: store.getState().isprops.history
    } 
  }

  render () {
    return (
      <div id='header'>
          <img src={ require('../img/left.png')} alt="" onClick={() => this.state.historys.goBack()}/>
          <span>{ this.props.title }</span>
          { this.props.righttext ?  <p>{ this.props.righttext}</p> : ''}
      </div>
    )
  }
// 

}