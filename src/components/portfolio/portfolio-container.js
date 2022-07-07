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
        
      this.handleFilter = this.handleFilter.bind(this);
  }
  /* ---Aqui pedimos la info que la meta a "data"--- */
   /* al decir filter = null estamos diciendo que si pasa el filtro o no, no es importante, la operacion puede funcionar sin ell */
  getPortfolioItems(filter = null){//los arrow functions son indispensables aqui
  axios.get('https://yanfer.devcamp.space/portfolio/portfolio_items')
  .then(response => {
    if (filter) {
      this.setState({
        data: response.data.portfolio_items.filter(item =>{
          return item.category === filter;
        })
      });
    } else {
      // handle success
      /* console.log("response data",response); */
      this.setState({
        data: response.data.portfolio_items
      });
    }
  })
  .catch(error => {
  // handle error
      console.log(error);
      });
  }
  //State
  //Lifecycle hooks
  //Estas funciones poderosas de arriba solo funcionan con componentes basados en clases(como este componente) no en funciones (como portofolio-item)
  
  portfolioItems(){

    /* ---Aqui que nos impriman la data--- */
    return this.state.data.map(item =>{
      return <PortfolioItem key={item.id} item={item}/>;
    });
  }

  /* handlePageTitleUpdate(){
      this.setState({
          pageTitle: "Something Else"
      })
  } */

  //cada vez que hagamos un click handler siempre hay que poner "handle" al principio, es una buena practica
  handleFilter(filter){
    if ( filter === "CLEAR_FILTERS")  {
      this.getPortfolioItems();
    } else {
        this.getPortfolioItems(filter);
      }
    }


    componentDidMount(){
      this.getPortfolioItems();
    }
    render(){
      // short circuit por si no carga el contenido todavia
      if (this.state.isLoading){
        return <div>Loading...</div>;
      }

      return(
        <div className="homepage-wrapper">
          <div className="filter-links">
            <button className="btn" onClick={() => this.handleFilter('Cars')}>Cars</button>
            <button className="btn" onClick={() => this.handleFilter('technology')}>Technology</button>
            <button className="btn" onClick={() => this.handleFilter('social_media')}>Social Media</button>
            <button className="btn" onClick={() => this.handleFilter('CLEAR_FILTERS')}>All</button>
          </div>
          <div className="portfolio-items-wrapper">
            {this.portfolioItems()}
          </div>
        </div>
      );
    }
}