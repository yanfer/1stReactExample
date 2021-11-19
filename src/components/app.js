import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavigationContainer from './portfolio/navigation/navigation-container';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Blog from './pages/blog';
import PortfolioDetail from './portfolio/portfolio-detail';
import Auth from './pages/auth';
import NoMatch from './pages/no-match';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    };

    this.handleSucceessfulLogin = this.handleSucceessfulLogin.bind(this);
    this.handleUnsucceessfulLogin = this.handleUnsucceessfulLogin.bind(this);
  }

  handleSucceessfulLogin(){
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnsucceessfulLogin(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  render() {
    return (
      <div className='app'>
        <Router>
          <div>
          <NavigationContainer/>
          <h2>{this.state.loggedInStatus}</h2>
          <Switch>
            <Route exact path="/" component= {Home}></Route>
            
            <Route 
            path="/auth" 
            render={props=>(
              <Auth
              {...props}
              handleSucceessfulLogin={this.handleSucceessfulLogin}
              handleUnSucceessfulLogin={this.handleUnsucceessfulLogin}
              />
            )}
            ></Route>

            <Route path="/about-me" component= {About}></Route>
            <Route path="/contact" component= {Contact}></Route>
            <Route path="/blog" component= {Blog}></Route>
            <Route exact path="/portfolio/:slug" component= {PortfolioDetail}></Route>
            <Route component={NoMatch}></Route>
          </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
