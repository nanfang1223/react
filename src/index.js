import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "axios";
import store from './store'
import 'lib-flexible'
import {PersistGate} from 'redux-persist/lib/integration/react';
import {Provider} from 'react-redux';
import configStore from './store/index';
import {persistor} from './store/index';

React.Component.prototype.axios = axios;
React.Component.prototype.store = store;
// React.Component.prototype.Myalert = Myalert

ReactDOM.render(<Provider store={configStore}>
  <PersistGate loading={null} persistor={persistor}>
      <App />
  </PersistGate>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


// 解决redux数据丢失问题
// https://segmentfault.com/a/1190000018150177
// 解决react 余 radux的版本不同问题,,,删除nodemodius重新安装

// react 移动端适配问题
serviceWorker.unregister();
