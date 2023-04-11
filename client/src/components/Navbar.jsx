import React from 'react'
import "../App.css"
import { Link } from 'react-router-dom';

const Navbar = ({name}) => {
  console.log(name)
  return (
    <nav className='nav'>
      <div>
        <a href="/" >AnnonyBlog</a>
      </div>
      <div>
      {name ? (
        <h4>Welcome <span>{name}</span></h4>
      ) : (
        <Link to="/login">Login</Link>
      )}
      
      {name ? (
        <Link to="/create">Create</Link>
      ) : (
        ""
      )}
        <a href="#" className="active">About</a>
        <a href="#" className="active">Posts</a>
        <a href="#" className="active">Admins</a>
      </div>
    </nav>
  )
}

export default Navbar




