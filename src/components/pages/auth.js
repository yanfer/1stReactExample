import React, { Component } from 'react';
import loginImg from '../../../static/assets/images/auth/login.jpg'; 
import Login from '../auth/login';

export default class Auth extends Component {
    constructor(){ 
        super();
    }

    render() {
        return (
            <div  className="auth-page-wrapper">
                {/* cuando sean cosas como poner imagenes, no es necesario poner un div de cierre, cerrando el mismo div de entrada es suficiente */}
                <div className="left-column" 
                style={{
                    backgroundImage: `url(${loginImg})`
                }}
                />
                    

                <div className="right-column">
                    <Login/>
                </div>
            </div>
        );
    }
}