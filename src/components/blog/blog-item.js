import React from "react";
import { Link } from "react-router-dom";
import striptags from "striptags";
import Truncate from "react-truncate";

const BlogItem = props => {
  const {
    id,
    blog_status,
    content,
    title,
    featured_image_url
  } = props.blogItem;

  return (
    <div>
      <Link to={`/b/${id}`}>
      <h1>{title}</h1>
      </Link>
      <div>
        {/* ESTO MUESTRA CUANTAS LINEAS SE PUEDEN MOSTRRAR EN LA DESCRIPCION, elipsis sirve para poner iconos, links o lo que sea */}
        <Truncate lines={5} ellipsis={
          <span>
            ...<Link to={`/b/${id}`}>Read more</Link>
          </span>
        }>{striptags(content)}</Truncate>
      </div>
    </div>
    
  );
};

export default BlogItem;