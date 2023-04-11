import React from 'react'
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import CommentPage from './CommentPage';
import Axios from "axios";

const Comments = () => {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const {id} = useParams();
    useEffect(() => {
        fetch(`http://localhost:3001/post/${id}/comment`).then(response => {
            response.json().then(comments => {
                setComments(comments);
              // console.log(comments)
            });
          });
      }, []);

      const addComment = async () => {
        // console.log(id)
        try {
          const newcomment = await Axios.post(`http://localhost:3001/post/${id}/comment`, {
            comment
          });
          if(newcomment.status === 200){
            alert('new comment added')
          }
          setComment('')
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <div class="comment-section">
  <div class="comment-box">
    <input type="text" placeholder="Add a comment" className='comment-input' 
    onChange={(event)=> setComment(event.target.value)} />
    <button className='comment-button' onClick={addComment}>Comment</button>
  </div>
  <div className="comment-list">
    {comments.length > 0 && comments.map(comment => (
      <CommentPage {...comment} key={comment._id}/>
    ))}
  </div>
</div>

  )
}

export default Comments