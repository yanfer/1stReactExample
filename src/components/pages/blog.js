import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import BlogItem from '../blog/blog-item';
import BlogModal from '../modals/blog-modal';



export default class Blog extends Component {
  constructor(){ 
    super();

    this.state = {
      blogItems: [],
      totalCount: 0,
      currentPage: 0,
      isLoading: true,
      blogModalIsOpen: false
    }

    this.getBlogItems = this.getBlogItems.bind(this);
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener("scroll", this.onScroll, false);
    this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSuccessfulNewBlogSubmission = this.handleSuccessfulNewBlogSubmission.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick(blog){
    axios.delete(`https://api.devcamp.space/portfolio/portfolio_blogs/${blog.id}`, 
    {withCredentials: true}).then(response =>{
      this.setState({
        blogItems: this.state.blogItems.filter(blogItem =>{
          return blog.id != blogItem.id;
        })
      });
      /* esto no es realmente necesario porque va a estar vacia */
      return response.data;
    }).catch(error =>{
      console.log("delete blog error", error);
    })
  }

  handleSuccessfulNewBlogSubmission(blog){
    this.setState({
      blogModalIsOpen: false,
      blogItems: [blog].concat(this.state.blogItems)
    });
  }


  handleModalClose(){
    this.setState({
      blogModalIsOpen: false
    })
  }

  handleNewBlogClick(){
    this.setState({
      blogModalIsOpen: true
    });
  }

  /* si añadimos el this.state.isLoading || entonces no habra un bug por cargar el contenido demasiado rapido */
  onScroll(){
    if(this.state.isLoading || this.state.blogItems.length === this.state.totalCount){
      /* si se usa return en un "if" en JS y cumple la condicion,basicamente rompera el esquema de toda la funcion, eso lo que queremos*/
      return;
    }

    if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
      this.getBlogItems();
    }
  }

  getBlogItems(){
    this.setState({
      currentPage: this.state.currentPage + 1
    })
    axios.get(`https://yanfer.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage} `, 
    {withCredentials: true}
    ).then(response =>{
      console.log('getting', response.data);
      this.setState({
        blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
        totalCount: response.data.meta.total_records,
        isLoading: false
      })
    }).catch(error=>{
      console.log('getBlogItems error', error);
    });
  }
  
  componentWillMount(){
    this.getBlogItems();
  }

  componentWillUnmount(){
    window.removeEventListener('scroll',this.onScroll, false);
  }

  render() {
    const blogRecords = this.state.blogItems.map(blogItem=>{
      if (this.props.loggedInStatus === "LOGGED_IN") {
        return (
          /* se pone el key en el div en vez del BlogItem para envovler tambien a Delete */
          <div key={blogItem.id} className='admin-blog-wrapper'>
            <BlogItem blogItem= {blogItem}/>
            {/* se una una funcion anonima ()=> para que no se ejecute al momento de cargar */}
            <a onClick={() => this.handleDeleteClick(blogItem)}><FontAwesomeIcon icon='trash'/></a>
          </div>
        )
      } else {
        return <BlogItem key={blogItem.id} blogItem= {blogItem}/>
      }

    });

    /* aqui no se usa this.blogRecords porque estamos poniendolo dentro de Render, si fuera afuera si tendriamos que hacerlo */

    return (
      <div className= "blog-container">
        <BlogModal 
        handleSuccessfulNewBlogSubmission = {this.handleSuccessfulNewBlogSubmission}
        handleModalClose={this.handleModalClose}
        modalIsOpen= {this.state.blogModalIsOpen}/>


        {this.props.loggedInStatus === "LOGGED_IN" ? (
        <div className='new-blog-link'>
          <a onClick={this.handleNewBlogClick}><FontAwesomeIcon icon="circle-plus"/></a>
        </div>) :  null}

        <div className='content-container'> {blogRecords}</div>

        {this.state.isLoading ? (
        <div className='content-loader'>
          <FontAwesomeIcon icon="fa-solid fa-circle-notch" spin />
        </div>) : null}
      </div>
    )
  }
}



