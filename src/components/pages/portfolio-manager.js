import React, { Component } from 'react';
import axios from 'axios';

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list"
import PortfolioForm from "../portfolio/portfolio-form"

export default class PortfolioManager extends Component {
  constructor(){ 
    super();

    this.state = {
      portfolioItems: []
    };

    this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
  }

  /* concat es solo para REACT es push pero lo agrega al inicio */
  handleSuccessfulFormSubmission (portfolioItem){
    this.setState({
      portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
    })
    
  }

  handleFormSubmissionError(error){
    console.log('handleFormSubmissionError error', error);
  }

  getPortfolioItems(){                                               /* esto es especifico del API para que se queden en primer lugar las nuevas entradas */
    axios.get("https://yanfer.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", 
    {withCredentials: true
  }).then(response => {
    this.setState({
      portfolioItems : [...response.data.portfolio_items]
    })
  }).catch(error => {
    console.log("error in getPortfolioItems", error)
  })
  }

  componentDidMount(){
    this.getPortfolioItems();
  }

  render() {
      return (
          <div className='portfolio-manager-wrapper'>
            <div className='left-column'>
              <PortfolioForm
              handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
              handleFormSubmissionError={this.handleFormSubmissionError}
              />
            </div>
            <div className='right-column'>
              <PortfolioSidebarList data={this.state.portfolioItems}/>
            </div>
          </div>
      );
  }
}