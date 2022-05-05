import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";   
import Icons from "../helpers/icons";
import BlogDetail from './pages/blog-detail';
import NavigationContainer from './navigation/navigation-container';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Blog from './pages/blog';
import PortfolioManager from "./pages/portfolio-manager"
import PortfolioDetail from './portfolio/portfolio-detail';
import Auth from './pages/auth';
import NoMatch from './pages/no-match';




export default class App extends Component {
  constructor(props){
    super(props);

    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin(){
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnsuccessfulLogin(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  handleSuccessfulLogout(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  checkLoginStatus(){
    return axios.get("https://api.devcamp.space/logged_in", 
    {withCredentials: true}).then(response => {
      const loggedIn = response.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus;

      //If loggedIn and status is LOGGED_IN => return Data
      //If loggedIn status NOT_LOGGED_IN => update State
      //If not loggedIn and status LOGGED_IN => update state

      if (loggedIn && loggedInStatus === "LOGGED_IN"){
        return loggedIn;
      } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN"){
        this.setState({
          loggedInStatus: "LOGGED_IN"
        });
      } else if (!loggedIn && loggedInStatus === "LOGGED_IN"){
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN"
        })
        .catch(error => {
          console.log("Error", error);
        })
      }

    });
  }

  componentDidMount(){
    this.checkLoginStatus();
  }

  authorizedPages(){
    return [
      <Route key="1" path="/portfolio-manager" component={PortfolioManager}></Route>,
      ]
  }

  render() {
    return (
      <div className='app'>
        <Router>
          <div>
          <NavigationContainer 
          loggedInStatus={this.state.loggedInStatus}
          handleSuccessfulLogout={this.handleSuccessfulLogout}/>
          
          <Switch>
            <Route exact path="/" component= {Home}></Route>
            
            <Route 
            path="/auth" 
            render={props=>(
              <Auth
              /* hace posible obtener todas las props de Auth */
              {...props}
              handleSuccessfulLogin={this.handleSuccessfulLogin}
              handleUnSuccessfulLogin={this.handleUnsuccessfulLogin}
              />
            )}
            ></Route>

            <Route path="/about-me" component= {About}></Route>
            <Route path="/contact" component= {Contact}></Route>

            <Route path="/blog" 
            render={props => (
              /* esto hace posible que Blog obtenga todas las props dentro, no llas estamos sobreescribiendo solo agregando las nuestras personalizadas  */
              <Blog{...props} loggedInStatus={this.state.loggedInStatus}/>
            )}
            ></Route>

            <Route path="/b/:slug" component= {BlogDetail}></Route>
            {this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages(): null}
            <Route exact path="/portfolio/:slug" component= {PortfolioDetail}></Route>
            <Route component={NoMatch}></Route>
          </Switch>

          </div>
        </Router>
      </div>
    );
  }
}
