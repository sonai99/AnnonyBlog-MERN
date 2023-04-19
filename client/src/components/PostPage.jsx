import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Link} from 'react-router-dom';
import "../App.css"
import Comments from "./Comments";

const PostPage = () => {
    const [postInfo,setPostInfo] = useState(null);
    const {id} = useParams();
  useEffect(() => {
    fetch(`http://localhost:3001/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
          console.log(postInfo)
        });
      });
  }, []);

  if (!postInfo) return '';

  return (
    <>
    <div className="post">
      <div>
      </div>
      <div className="post-section">
<img src={'http://localhost:3001/'+postInfo.cover} alt=""/>
        <h1 class="post-heading">{postInfo.content}</h1>  
        <p class="post-content">{postInfo.blog}</p>
    </div>
    <Comments />
    </div>
    <Link to="/" className="link">
  See Blogs
</Link>
    </>
  )
}

export default PostPage



