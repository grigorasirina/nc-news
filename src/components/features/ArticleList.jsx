import React from 'react';
import useFetch from '../../hooks/useFetch.js';
import ArticleListItem from './ArticleListItem.jsx';

const ArticleList = () => {
  // *** IMPORTANT: REPLACE WITH YOUR LIVE BACKEND API URL ***
  const backendBaseUrl = 'https://news-be-1493.onrender.com/api';
  const { data, isLoading, error } = useFetch(`${backendBaseUrl}/articles`);

  if (isLoading) {
    return <p>Loading articles...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !Array.isArray(data.articles)) {
    return <p>No articles found.</p>
  }

  return (
    <section>
      <h3>Latest Articles</h3>
      <ul>
        {data.articles.map((article) => (
          <ArticleListItem key={article.article_id} article={article} />
        ))}
      </ul>
    </section>
  );
};

export default ArticleList;