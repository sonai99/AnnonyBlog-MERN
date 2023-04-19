/* eslint-disable jsx-a11y/anchor-is-valid */
import {Link} from "react-router-dom";
import "../App.css"
import {useEffect, useState} from "react";
import Axios from "axios";

const Post = ({summary,content,blog,author,_id,likeCount,cover,createdAt}) => {
  const date = new Date(createdAt);
  const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  const [post, setPost] = useState(null);
  
  const postId= _id;
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:3001/post/${postId}`);
      const data = await response.json();
      setPost(data);
      console.log(cover)
    };
    fetchPost();
  }, [postId]);
  

  const likePost = async (_id) => {
    try {
      const response = await fetch(`http://localhost:3001/post/${_id}/likePost`, {
        method: 'PATCH'
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const updatedPost = await response.json();
      setPost(updatedPost);      // update state with the updated post data
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  

  return (

    <div className="main-post-page">
      <div className="image-content">
        <div className="left-content">
        <p>{formattedDate}</p>
        <Link to={`/post/${_id}`}>
        <h1 style={{ fontWeight: 'bold', color: 'black' }}>{content}</h1>
        <p style={{ opacity: 0.8, color: 'gray', fontSize: '14px' }}>{summary}</p>
        </Link>
          <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0', backgroundColor: '#f4f4f4', verticalAlign:'1' }}>
          <a onClick={() => { likePost(_id) }} style={{ display: 'inline-block', padding: '2px 8px', backgroundColor: 'green',color: 'white',textDecoration: 'none',borderRadius: '4px',cursor: 'pointer',marginRight: '10px',marginTop: '5px',marginBottom: '5px',marginLeft: '5px'

}}>Like</a>

          <p style={{ margin: '0 0 0 10px' }}>Likes: {likeCount}</p>
          </div>
        </div>
        <div className="right-image">
        <Link to={`/post/${_id}`}>
        <img src={'http://localhost:3001/'+cover} alt=""/>
        </Link>
        </div>
      </div>
      
    </div>

  )
}

export default Post

