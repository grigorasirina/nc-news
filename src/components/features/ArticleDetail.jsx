import React, { useState } from 'react';
import { format } from 'date-fns';
import { patchArticleVotes } from '../../../Api';

const ArticleDetail = ({ article }) => {
  const [currentVotes, setCurrentVotes] = useState(article.votes);
  const [voteError, setVoteError] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [userVote, setUserVote] = useState(0);

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
      <p className="=article-body">{article.body}</p>
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
    </article>
  );
};

export default ArticleDetail;