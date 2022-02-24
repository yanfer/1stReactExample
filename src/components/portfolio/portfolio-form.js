import React, { Component } from 'react';
import axios from "axios";
import { DropzoneComponent } from 'react-dropzone-component';

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";


export default class PortfolioForm extends Component {
  constructor(props){ 
    super(props);

    this.state={
      name: "",
      description: "",
      category: "Cars",
      position: "",
      url: "",
      thumb_image: "",
      banner_image: "",
      logo: ""
    };

    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleThumbDrop = this.handleThumbDrop.bind(this);
    this.handleBannerDrop = this.handleBannerDrop.bind(this);
    this.handleLogoDrop = this.handleLogoDrop.bind(this);
  }
  /* este metodo es especifico para Dropzone, no se puede cambiar */
  handleThumbDrop(){
    return{
      addedfile: file =>this.setState({thumb_image: file})
    }
  }
  componentConfig(){
    return {
      iconFiletypes:[".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    }
  }

  djsConfig(){
    return{
      addRemoveLinks: true,
      maxFiles: 1
    }
  }

  buildForm(){
    let formData = new FormData();

    formData.append("portfolio_item[name]",this.state.name);
    formData.append("portfolio_item[description]",this.state.description);
    formData.append("portfolio_item[url]",this.state.url);
    formData.append("portfolio_item[category]",this.state.category);
    formData.append("portfolio_item[position]",this.state.position);

    if(this.state.thumb_image){
      formData.append("portfolio_item[thumb_image]",this.state.thumb_image);
    }

    /* aqui se puede usar un debugger para sacar la info, para hacerlo, poner en la consola
    for (var value of formData.values()){
    console.log(value);
    } */
    return formData;
  }

  handleChange(event){
      this.setState({
        [event.target.name]: event.target.value
      });
  }

  handleSubmit(event){

    axios.post("https://yanfer.devcamp.space/portfolio/portfolio_items", 
    this.buildForm(), 
    {withCredentials: true}
    ).then(response =>{
      this.props.handleSuccessfulFormSubmission(response.data.portfolio_item);
    }).catch(error => {
      console.log("portfolio form handle submit error", error);
    })
    event.preventDefault();
  }

  render() {
      return (
          <div>
            <h1>PortfolioForm</h1>

            <form onSubmit={this.handleSubmit}>
              <div>
                <input 
                  type="text" 
                  //los nombres tienen que ser iguales que los que hay en el state de super
                  name="name" 
                  placeholder='Portfolio Item Name' 
                  value={this.state.name}
                  onChange={this.handleChange}>
                </input>

                <input 
                  type="text" 
                  name='url' 
                  placeholder='URL' 
                  value={this.state.url}
                  onChange={this.handleChange}>
                </input>
              </div>

              <div>
              <input 
                  type="text" 
                  name='position' 
                  placeholder='Position' 
                  value={this.state.position}
                  onChange={this.handleChange}>
                </input>
                  {/* asi se hace un select tag */}
                <select 
                  name='category' 
                  value={this.state.category}
                  onChange={this.handleChange}
                  >
                    <option value="Cars">Cars</option>
                    <option value="social_media">Social Media</option>
                    <option value="technology">Technology</option>
                </select>
              </div>

              <div>
              <textarea 
                  type="text" 
                  name='description' 
                  placeholder='Description' 
                  value={this.state.description}
                  onChange={this.handleChange}>
                </textarea>
              </div>

              <div className='image-uploaders'>
                <DropzoneComponent
                  config={this.componentConfig()}
                  djsConfig={this.djsConfig()}
                  eventHandlers={this.handleThumbDrop()}
                  ></DropzoneComponent>
              </div>

              <div>
                <button type='submit'>Save</button>
              </div>
            </form>
          </div>
      );
  }
}