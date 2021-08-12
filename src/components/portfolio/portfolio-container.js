import React, {Component} from "react";


import PortfolioItem from "./portfolio-item";
export default class PortfolioContainer extends Component{
    //Los constructories solo se pueden usar en clases de React
    constructor(){
        super();
        this.state = {
            pageTitle: "Welcome to my portfolio",
            isLoading: false,
            data: [
            {title:"Quip", category: 'eComerce', slug: "quip"},
            {title:"Stingray", category: 'Calls', slug: "stingray"}, 
            {title:"Startek", category: 'Calls', slug: "startek"}
        ]
        }
        //cada vez que hay un click listener, event listener o algo asi, hay que hacer esta sintaxis para llamar this.
        /* this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this); */
        
        this.handleFliter = this.handleFliter.bind(this);
    }
    //State
    //Lifecycle hooks
    //Estas funciones poderosas de arriba solo funcionan con componentes basados en clases(como este componente) no en funciones (como portofolio-item)
    
    portfolioItems(){
        return this.state.data.map(item =>{
            return <PortfolioItem title={item.title} url={"google.com"} slug={item.slug}/>;
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