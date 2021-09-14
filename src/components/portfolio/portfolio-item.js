import React, {Component} from 'react';
import { Link } from 'react-router-dom';

export default class PortfolioItem extends Component{
    constructor(props){
        super(props);

        this.state = {
            PortfolioItemClass: ""
        };
    }

    handleMouseEnter(){
        this.setState({PortfolioItemClass: "image-blur"})
    }

    handleMouseLeave(){
        this.setState({PortfolioItemClass: ""})
    }

    render (){
        const { id, description, thumb_image_url, logo_url } = this.props.item;
    return (
        <div className="porftolio-item-wrapper"
        /* se llama a esta funcion dentro de una arrow funcion para que el evento no sea un bucle infinito 
        le decimons que no llame a la funcion hasta que "onMouseEnter" ocurra*/
        onMouseEnter={()=> this.handleMouseEnter()}
        onMouseLeave={()=> this.handleMouseLeave()}
        >

            <div /* aqui debe haber un espacio para que no lo agarre JS los 2 como si fueran uno */
            className={"portfolio-img-background " + this.state.PortfolioItemClass}
            style={{
                backgroundImage: "url(" + thumb_image_url + ")"
            }}
            />
            <div className= "img-text-wrapper">
                <div className="logo-wrapper">
                    <img src={logo_url}/>
                </div>
                <div className="subtitle">{description}</div>
            </div>
        </div>
    );
    }
}