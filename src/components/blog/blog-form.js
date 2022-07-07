import React, { Component } from 'react';
import axios from 'axios';
import { DropzoneComponent } from 'react-dropzone-component';

import RichTextEditor from "../forms/rich-text-editor";
import { faYenSign } from '@fortawesome/free-solid-svg-icons';

export default class BlogForm extends Component {
  constructor(props){ 
    super(props);

    this.state ={
      id: '',
      title: '',
      blog_status: '',
      content: '',
      featured_image: '',
      apiUrl: 'https://yanfer.devcamp.space/portfolio/portfolio_blogs',
      apiAction: 'post'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);

    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.featuredImageRef = React.createRef();

  }

  deleteImage(imageType) {
    axios.delete(`https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${this.props.blog.id}
    ?image_type=${imageType}`, 
    {withCredentials:true})
    .then(response => {
      this.props.handleFeaturedImageDelete();
    }).catch(error =>{
      console.log('deleteImage error', error);
    });
  }

  componentWillMount(){
    if (this.props.editMode) {
      this.setState({
        id: this.props.blog.id,
        title: this.props.blog.title,
        blog_status: this.props.blog.blog_status,
        content: this.props.blog.content,
        apiUrl: `https://yanfer.devcamp.space/portfolio/portfolio_blogs/${this.props.blog.id}`,
        apiAction: 'patch'
      });
    }
  }

  handleFeaturedImageDrop(){
    return {
      /* este es un eventHandler, asi que cuando se llame se llamara primero el eventHandler */
      addedfile: file => this.setState({ featured_image: file })
    }
  }

  componentConfig(){
    return{ /* esto no quiere decir que solo esto va a aceptar, si no que en la etiqueta dira esto */
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    };
  }

  djsConfig(){
    return {
      addRemoveLinks: true,
      maxFiles: 1
    }
  }

  handleRichTextEditorChange(content){
    /* hay sintaxis que permiten poner el contenido sin ocupar un (llave: valor), como la que se usa abajo */
    this.setState({ content })
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
    formData.append('portfolio_blog[content]', this.state.content);

    if(this.state.featured_image){
      formData.append('portfolio_blog[featured_image]', this.state.featured_image);
    }

    return formData;
  }

  handleSubmit(event){
    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: this.buildForm(),
      withCredentials: true
    })  
    .then(response => {
      if(this.state.featured_image){
        this.featuredImageRef.current.dropzone.removeAllFiles();
      }

      this.setState({
        title:'',
        blog_status:'',
        content: '',
        featured_image: ''
      });
      if(this.props.editMode){
        // Update blog detail component
        this.props.handleUpdateFormSubmission(response.data.portfolio_blog);
      } else {
      this.props.handleSuccessfullFormSubmission(response.data.portfolio_blog);
    }

    }).catch(error =>{
      console.log('handleSubmit for Blog Error', error);
    })


    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="blog-form-wrapper">
        <div className='two-column'>
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
        </div>

        <div className='one-column'>
          <RichTextEditor 
            handleRichTextEditorChange={this.handleRichTextEditorChange}
            editMode={this.props.editMode}
            contentToEdit={this.props.editMode && this.props.blog.content ? this.props.blog.content : null}
          />
        </div>

        <div className='image-uploaders'>
          {this.props.editMode && this.props.blog.featured_image_url ? (
            <div className='portfolio-manager-image-wrapper'>
              <img src={this.props.blog.featured_image_url}/>

              <div className='image-removal-link'>
                <a onClick={()=> this.deleteImage('featured_image')}>Remove File</a>
              </div>
            </div> ) : (
          <DropzoneComponent
          ref={this.featuredImageRef}
          /* porque algunas funciones se llaman como props y otras como funciones? osea con () al final, la diferencia es que si queremos que se llamen inmediateamente usamos () */
          config={this.componentConfig()}
          djsConfig={this.djsConfig()}
          eventHandlers={this.handleFeaturedImageDrop()}>
            <div className='dz-message'>Featured Image</div>
          </DropzoneComponent> )}
        </div>
        {/* debe tener siempre un child component, en este caso sera el boton */}
        <button className='btn'>Save</button>
      </form>
    );
  }
}