import React from 'react';

const CommentCard = ({ comment }) => {
  return (
    <div className="comment-card">
      <p className="comment-body">{comment.body}</p>
      <p className="comment-info"> 
        <span>Votes: {comment.votes}</span>
      </p>
    </div>
  );
};

export default CommentCard;