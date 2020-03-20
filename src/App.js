import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import 'antd/dist/antd.css'
import './common/common.css'
import 'antd-mobile/dist/antd-mobile.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './login/index'
import Home from './home/index'

function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path='/' component={Login}></Route>
      <Route exact path='/home' component={Home}></Route>
    </div>
    </Router>
  );
}

export default App;
