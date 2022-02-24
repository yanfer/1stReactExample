import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router';
import { NavLink } from 'react-router-dom';

/* los HOC(higherOrderComponents siempre comienzan con minuscula como withRouter) */
/* los Components de verdad comienzan con mayuscula como NavLink */
const  NavigationComponent =(props) =>{

  const dynamicLink = (route, linkText) => {
    return(
      <div className="nav-link-wrapper">
        <NavLink exact to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
    )
  }

  const handleSignOut = () => {
    axios.delete("https://api.devcamp.space/logout", {withCredentials: true}).then(response =>{
      if (response.status === 200) {
        props.history.push("/");
        props.handleSuccessfulLogout();
      }
      return response.data;
    }).catch(error => {
      console.log("error signing out", error);
    })
  };


  return (
    <div className="nav-wrapper">
        <div className="left-side">
        <div className="nav-link-wrapper">
        <NavLink exact to="/" activeClassName="nav-link-active">Home</NavLink>
      </div>
      <div className="nav-link-wrapper">
        <NavLink exact to="/about-me" activeClassName="nav-link-active">About</NavLink>
      </div>
      <div className="nav-link-wrapper">
        <NavLink exact to="/contact" activeClassName="nav-link-active">Contact</NavLink>
      </div>
      <div className="nav-link-wrapper">
        <NavLink exact to="/blog" activeClassName="nav-link-active">Blog</NavLink>
      </div>
      {/* <div className="nav-link-wrapper">
        {true ? <button>Add Blog</button> : null}
      </div> */}
      {/* lo de abajo es igual a decir:       true ? "do this" : "do something else" */}
      {props.loggedInStatus === "LOGGED_IN" ?  dynamicLink("/portfolio-manager", "Portfolio Manager") : null}
      </div>
      <div className="right-side">
        YANFER ARAQUE
                      {/* aqui no se utilizo this.handleSignOut porque this solo se usa en clases no en funciones */}
        {props.loggedInStatus === "LOGGED_IN" ?  <a onClick={handleSignOut}>Sign Out</a> : null}
      </div>
    </div>
    );
    
}

export default withRouter (NavigationComponent);