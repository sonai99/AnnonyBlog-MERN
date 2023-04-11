import {Link} from "react-router-dom";
import "../App.css"
import {useEffect, useState} from "react";
import Axios from "axios";

const Post = ({summary,content,blog,author,_id,likeCount}) => {

  const [post, setPost] = useState(null);
  const postId= _id;
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:3001/post/${postId}`);
      const data = await response.json();
      setPost(data);
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
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="container-fluid">
        <div className="container">
        <Link to={`/post/${_id}`}>
  <h2 className="content" style={{ fontWeight: 'bold', textDecoration: 'none', color: 'blue' }}>{content}<span style={{ fontSize: '1rem', color: 'gray', marginLeft: '1rem', fontWeight: 'normal' }}>by anonymous</span>
</h2>
</Link>
        <p className="content">{summary}</p>
        </div>
        <div className="like" style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={()=>{likePost(_id)}}>Like</button>
        <p style={{ marginLeft: '10px' }}>Likes : {likeCount}</p>
        </div>
    </div>
  )
}

export default Post