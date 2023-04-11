import React, { useState } from 'react'
import "../App.css"
import {Navigate} from "react-router-dom";
import Axios from "axios";
import { Link } from 'react-router-dom';


const CreatePost = () => {
  const [summary, setSumamry] = useState('')
  const [content, setContent] = useState('')
  const [blog, setBlog] = useState('')
  const [redirect, setRedirect] = useState(false);

  const create = async () => {
    try {
      const response = await Axios.post("http://localhost:3001/createPost", {
        summary,
        content,
        blog,
      });
      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className='post-page'>
      <h1 style={{ fontWeight: 'bold' }}>Create new post #Annonymously</h1>
      <div className="post-form-section">
        <label htmlFor="">Summary</label>
        <input type="text" name='summary' placeholder='Summary' onChange={(event)=>setSumamry(event.target.value)} />
        <label htmlFor="">Content</label>
        <input type="text" name='content' placeholder='Content' onChange={(event)=>setContent(event.target.value)} />
        <label htmlFor="">Blog</label>
        <textarea type="text" name='blog' placeholder='Blog' onChange={(event)=>setBlog(event.target.value)} />
        <button onClick={create}>Create</button>
      </div>
    </div>
  )
}

export default CreatePost