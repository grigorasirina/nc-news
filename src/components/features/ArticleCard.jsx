import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <h2 className="article-title">{article.title}</h2>
      <p className="article-meta">
        By <strong>{article.author}</strong> on {format(new Date(article.created_at), 'MMM dd,yyyy')}
      </p>
      <p className="article-topic">Topic: {article.topic}</p>

      {article.article_img_url && (
        <img src={article.article_img_url} alt={article.title} className="article-image" />
      )}

      <div className="article-stats">
        <span className="article-votes">Votes: {article.votes} </span>
        <span className="article-comments">Comments: {article.comment_count}</span>
      </div>

      <Link to={`/articles/${article.article_id}`} className="article-read-more">
        Read More
      </Link>
    </div>
  );
};

export default ArticleCard;
