import {useEffect, useState} from "react";
import Post from "./Post";
import "../App.css"

const IndexPage = () => {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <div className="container-fluid">
      <div className="container"> 
      </div>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} key={post._id}/>
      ))}
    </div>
  )
}

export default IndexPage