import React, { Component } from 'react';
import axios from 'axios';

export default class BlogForm extends Component {
  constructor(props){ 
    super(props);

    this.state ={
      title: '',
      blog_status: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    axios.post('https://yanfer.devcamp.space/portfolio/portfolio_blogs', 
    this.buildForm(), 
    {withCredentials: true}
    )
    .then(response => {
      this.props.handleSuccessfullFormSubmission(response.data.portfolio_blog)

      this.setState({
        title:'',
        blog_status:''
      });
    }).catch(error =>{
      console.log('handleSubmit for Blog Error', error);
    })


    event.preventDefault()
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  buildForm(){
    /* esto es un Form Data Object es una herramienta basica de JS, sirve para amarrar toda la info en un Objeto para pasarla facimente por la API*/
    let  formData = new FormData();
    /* esto depende de cada api pero aqui hace que sea mas facil mapear la API y decirle al objeto donde meter cada parte de la informacion */
    formData.append('portfolio_blog[title]', this.state.title);
    formData.append('portfolio_blog[blog_status]', this.state.blog_status);

    return formData;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
        <input type="text" 
        onChange={this.handleChange} 
        name='title'
        placeholder='Blog Title'
        value={this.state.title}/>

        <input type="text" 
        onChange={this.handleChange} 
        name='blog_status'
        placeholder='Blog status'
        value={this.state.blog_status}/>

        <button>Save</button>
      </form>
    );
  }
}