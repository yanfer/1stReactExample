import React, {Component} from "react";
import axios from 'axios';

import PortfolioItem from "./portfolio-item";
export default class PortfolioContainer extends Component{
    //Los constructories solo se pueden usar en clases de React
    constructor(){
        super();
        this.state = {
            pageTitle: "Welcome to my portfolio",
            isLoading: false,
            /* ---aqui creamos "data"--- */
            data: []
        }
        //cada vez que hay un click listener, event listener o algo asi, hay que hacer esta sintaxis para llamar this.
        /* this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this); */
        
        this.handleFliter = this.handleFliter.bind(this);
    }
    /* ---Aqui pedimos la info que la meta a "data"--- */
    getPortfolioItems(){//los arrow functions son indispensables aqui
    axios.get('https://yanfer.devcamp.space/portfolio/portfolio_items')
    .then(response => {
    // handle success
        /* console.log("response data",response); */
        this.setState({
            data: response.data.portfolio_items
        })
    })
    .catch(error => {
    // handle error
        console.log(error);
        })
    }
    //State
    //Lifecycle hooks
    //Estas funciones poderosas de arriba solo funcionan con componentes basados en clases(como este componente) no en funciones (como portofolio-item)
    
    portfolioItems(){
        return this.state.data.map(item =>{
            /* ---Aqui que nos impriman la data--- */
            return <PortfolioItem key={item.id} title={item.name} url={item.url} slug={item.id}/>;
        })
    }

    /* handlePageTitleUpdate(){
        this.setState({
            pageTitle: "Something Else"
        })
    } */

    //cada vez que hagamos un click handler siempre hay que poner "handle" al principio, es una buena practica
    handleFliter(filter){
        this.setState({
            data: this.state.data.filter(item =>{
                return item.category === filter
            })
        })
    }
    componentDidMount(){
        this.getPortfolioItems();
    }
    render(){
        // short circuit por si no carga el contenido todavia
        if (this.state.isLoading){
            return <div>Loading...</div>
        }
        
        return(
            <div>
                <button onClick={() => this.handleFliter('eComerce')}>eComerce</button>
                <button onClick={() => this.handleFliter('Calls')}>Calls</button>

                <h2>{this.state.pageTitle}</h2>
                {this.portfolioItems()}

                {/* <hr></hr>
                <button onClick={this.handlePageTitleUpdate}>Change Title</button> */}
            </div>
        )
    }
}