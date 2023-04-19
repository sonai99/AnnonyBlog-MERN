import React, { useState } from 'react'
import "../App.css"
import {Navigate} from "react-router-dom";


const CreatePost = () => {
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [blog, setBlog] = useState('')
  const [redirect, setRedirect] = useState(false);
  const [files, setFiles] = useState('');

  async function createNewPost(ev){
    const data = new FormData();
    data.set('content', content);
    data.set('summary', summary);
    data.set('blog', blog);
    data.set('file', files[0]);
    ev.preventDefault();

    const response = await fetch('http://localhost:3001/createPost', {
      method: 'POST',
      body: data,
      credentials: 'include'
    });
    if(response.ok){
      setRedirect(true);
    }
    // console.log(data)
  }
  
   if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <form onSubmit={createNewPost}>
      <input type='content' placeholder='content' value={content} onChange={(event)=>setContent(event.target.value)} />
      <input type='summary' placeholder='summary' value={summary} onChange={(event)=>setSummary(event.target.value)} />
      <input type='blog' placeholder='blog' value={blog} onChange={(event)=>setBlog(event.target.value)} />
      <input type='file' onChange={ev => setFiles(ev.target.files)} />
      <button style={{marginTop:'5px'}}>Create post</button>
    </form>
  )
}

export default CreatePost