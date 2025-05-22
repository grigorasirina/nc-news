import React, { useState } from 'react';
import { postComment } from '../../../Api';

const CommentForm = ({ article_id, onCommentPosted }) => {
  const [commentBody, setCommentBody] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);

  const username = 'tickle122';

  const handleSubmit = (event) => {
    event.preventDefault();
    setPostError(null);
    setPostSuccess(false);

    if (commentBody.trim() === '') {
      setPostError('Comment cannot be empty.');
      return;
    }

    setIsPosting(true);

    postComment(article_id, username, commentBody)
      .then((newComment) => {
        setCommentBody('');
        setPostSuccess(true);
        if (onCommentPosted) {
          onCommentPosted(newComment);
        }
        setTimeout(() => setPostSuccess(false), 3000);
      })
      .catch((err) => {
        setPostError('Failed to post comment. Please try again.');
        console.error("Error posting comment:", err);
      })
      .finally(() => {
        setIsPosting(false);
      });
  };

  return (
    <div className="comment-form-container">
      <h3>Add a Comment</h3>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
          placeholder="Write your comment here..."
          rows="4"
          className="comment-textarea"
          disabled={isPosting}
        ></textarea>
        <button type="submit" className="comment-submit-button" disabled={isPosting}>
          {isPosting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
      {postError && <p className="comment-error">{postError}</p>}
      {postSuccess && <p className="comment-success">Comment posted successfully!</p>}
    </div>
  );
};

export default CommentForm;