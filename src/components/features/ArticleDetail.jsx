import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { patchArticleVotes, fetchCommentsByArticleId, deleteCommentById } from '../../../Api';
import CommentForm from './CommentForm';

const ArticleDetail = ({ article }) => {
  const [currentVotes, setCurrentVotes] = useState(article.votes);
  const [voteError, setVoteError] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [userVote, setUserVote] = useState(0);

  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [deletedCommentId, setDeletedCommentId] = useState(null);

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const currentUser = 'tickle122';

  useEffect(() => {
    setCommentsLoading(true);
    setCommentsError(null);
    fetchCommentsByArticleId(article.article_id)
      .then((fetchedComments) => {
        setComments(fetchedComments);
      })
      .catch((err) => {
        setCommentsError('Failed to load comments.');
        console.error('Error fetching comments:', err);
      })
      .finally(() => {
        setCommentsLoading(false);
      });
  }, [article.article_id]);

  const handleCommentPosted = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const handleVote = (voteChange) => {
    setVoteError(null);

    let actualVoteChange = voteChange;

    if (voteChange === 1) { 
      if (userVote === 1) {
        return;
      } else if (userVote === -1) {
        actualVoteChange = 2;
      }
    } else if (voteChange === -1) {
      if (userVote === -1) {
        return;
      } else if (userVote === 1) {
        actualVoteChange = -2;
      }
    }

    setIsVoting(true);

    setCurrentVotes((prevVotes) => prevVotes + actualVoteChange);

    setUserVote(voteChange);

    patchArticleVotes(article.article_id, actualVoteChange)
      .then(() => {
      })
      .catch((err) => {
        setCurrentVotes((prevVotes) => prevVotes - actualVoteChange);
        setUserVote((prevUserVote) => {
          if (prevUserVote === voteChange) {
            return 0;
          } else if (voteChange === 1 && prevUserVote === -1) {
            return -1; 
          } else if (voteChange === -1 && prevUserVote === 1) {
            return 1; 
          }
          return 0;
        });
        
        setVoteError('Failed to update vote. Please try again.');
        console.error("Error voting:", err);
      })
      .finally(() => {
        setIsVoting(false);
      });
    }

    const handleDeleteComment = (comment_id) => {
        setDeleteError(null);
        setDeleteSuccess(false); 
        setIsDeleting(true);
        setDeletedCommentId(comment_id);

        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== comment_id)
        );

        deleteCommentById(comment_id)
          .then(() => {
            setDeleteSuccess(true);
        setTimeout(() => setDeleteSuccess(false), 3000);
          })
          .catch((err) => {
            setDeleteError('Failed to delete comment. Please try again.');
            console.error("Error deleting comment:", err);
            setComments((prevComments) => {
              fetchCommentsByArticleId(article.article_id)
                .then(setComments)
                .catch(console.error);
              return prevComments;
            });
          })
          .finally(() => {
            setIsDeleting(false);
            setDeletedCommentId(null);
          });
      };

  return (
    <article>
      <h2 className="article-title">{article.title}</h2>
      <p className="article-name">By {article.author} on {format(new Date(article.created_at), 'MMMM dd, yyyy, HH:mm')}</p> 
      <p className="article-topic">Topic: {article.topic}</p>
      <span style={{ color: 'green' }}>
        {article.article_img_url && (
          <img
            src={article.article_img_url}
            alt={article.title}
            style={{ maxWidth: '600px', display: 'block', height: 'auto', marginBottom: '1rem', marginLeft: 'auto', marginRight: 'auto' }}
          />
        )}
      </span>
      <p className="article-body">{article.body}</p>
      <div className="vote-controls">
        <button
          onClick={() => handleVote(1)}
          className={`vote-button upvote-button ${userVote === 1 ? 'voted' : ''}`}
          disabled={isVoting || userVote === 1}
        >
          👍
        </button>
        <span className="vote-count">Votes: {currentVotes}</span>
        <button
          onClick={() => handleVote(-1)}
          className={`vote-button downvote-button ${userVote === -1 ? 'voted' : ''}`}
          disabled={isVoting || userVote === -1}
        >
          👎
        </button>
        </div>

         {voteError && <p className="vote-error">{voteError}</p>}

        <CommentForm article_id={article.article_id} onCommentPosted={handleCommentPosted} />
        <div className="comments-section">
          <h3>Comments ({comments.length})</h3>
          {commentsLoading && <p>Loading comments...</p>}
          {commentsError && <p className="comments-error">{commentsError}</p>}
          {deleteError && <p className="delete-error">{deleteError}</p>}
        {deleteSuccess && <p className="delete-success">Comment deleted successfully!</p>}

          {!commentsLoading && !commentsError && comments.length === 0 && (
            <p>No comments yet. Be the first to comment!</p>
            )}
            <ul className="comments-list">
              {!commentsLoading && comments.map((comment) => (
                <li key={comment.comment_id}>
                  <div className="comment-display-item">
                    <p><strong>{comment.author}</strong> on {format(new Date(comment.created_at), 'MMM dd,yyyy')}</p>
                    <p>{comment.body}</p>
                    <p>Votes: {comment.votes}</p>

                    {comment.author === currentUser && (
                  <button
                    onClick={() => handleDeleteComment(comment.comment_id)}
                    className="delete-comment-button"
                    disabled={isDeleting && deletedCommentId === comment.comment_id}
                  >
                    {isDeleting && deletedCommentId === comment.comment_id ? 'Deleting...' : 'Delete'}
                  </button>
                )}

                  </div>
                </li>
              ))}
            </ul>
        </div>
    </article>
  );
};

export default ArticleDetail;