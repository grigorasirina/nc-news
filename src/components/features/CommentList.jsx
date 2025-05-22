import React from 'react';
import CommentCard from './CommentCard.jsx';

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <section className="comments-section">
      <h3 className='comments-title'>Comments ({comments.length})</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <CommentCard comment={comment} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CommentList;