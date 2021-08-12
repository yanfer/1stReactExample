import React from 'react';
import { Link } from 'react-router-dom';

export default function(){
    return(
        <div>
            <h2>Blog</h2>
            <div> {/* link es como una subcategoria de BrowserRouter, es como una a tag pero mejor porque tampoco recarga la pagina */}
                <Link to="/blog">This is my blog</Link>
            </div>
        </div>
    );
}