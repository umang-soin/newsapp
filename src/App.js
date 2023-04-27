import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Switch
} from "react-router-dom"

export default class App extends Component {
  pageSize = 15;
  // apiKey = '9dcb1766f98a4c5cb36085d8c8842dfa';
  apiKey = process.env.REACT_APP_NEWS_API;

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({progress:progress});
  }

  render() {
    return (
      <div>
        <Router>
       <Navbar/>  

       <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />

        <Routes>
          <Route exact path='/business' element={ <News apiKey={this.apiKey} setProgress={this.setProgress}  key="business" pageSize={this.pageSize} country="in" category="business"/>} />
          <Route exact path='/entertainment' element={ <News apiKey={this.apiKey} setProgress={this.setProgress}  key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/>} />
          <Route exact path='/' element={ <News apiKey={this.apiKey} setProgress={this.setProgress}  key="general" pageSize={20} country="in" category="general"/>} />
          <Route exact path='/health' element={ <News apiKey={this.apiKey} setProgress={this.setProgress}  key="health" pageSize={this.pageSize} country="in" category="health"/>} />
          <Route exact path='/science' element={ <News apiKey={this.apiKey} setProgress={this.setProgress}  key="science" pageSize={this.pageSize} country="in" category="science"/>} />
          <Route exact path='/sports' element={ <News apiKey={this.apiKey} setProgress={this.setProgress}  key="sports" pageSize={this.pageSize} country="in" category="sports"/>} />
          <Route exact path='/technology' element={ <News apiKey={this.apiKey} setProgress={this.setProgress}  key="technology" pageSize={this.pageSize} country="in" category="technology"/>} />
          <Route exact path='/general' element={ <News apiKey={this.apiKey} setProgress={this.setProgress}  key="general" pageSize={this.pageSize} country="in" category="general"/>} />
         </Routes>
       </Router>
      </div>
    )
  }
}
