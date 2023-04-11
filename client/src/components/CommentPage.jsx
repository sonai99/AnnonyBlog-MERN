import React from 'react'

const CommentPage = ({comment, createdAt}) => {
  // console.log(comment)
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleString();
  return (
    <div class="comment-list">
    <div class="comment">
    <p className='comment-date'>{formattedDate}</p>
      <div class="comment-content">{comment}</div>
    </div>
  </div>
  )
}

export default CommentPage