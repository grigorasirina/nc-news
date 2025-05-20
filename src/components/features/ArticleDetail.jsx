import React from 'react';
import { format } from 'date-fns';

const ArticleDetail = ({ article }) => {
  return (
    <article>
      <h2>{article.title}</h2>
      <p>By {article.author} on {format(new Date(article.created_at), 'MMMM dd, yyyy, HH:mm')}</p> 
      <p>Topic: {article.topic}</p>
      <span style={{ color: 'green' }}>
        {article.article_img_url && (
          <img
            src={article.article_img_url}
            alt={article.title}
            style={{ maxWidth: '600px', display: 'block', height: 'auto', marginBottom: '1rem', marginLeft: 'auto', marginRight: 'auto' }}
          />
        )}
      </span>
      <p>{article.body}</p>
    </article>
  );
};

export default ArticleDetail;