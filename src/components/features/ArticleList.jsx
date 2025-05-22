import React from 'react';
import useFetch from '../../hooks/useFetch.js';
import ArticleListItem from './ArticleListItem.jsx';
import { Link } from 'react-router-dom'; 

const ArticleList = () => {
  
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
      <h3 className='lastest-articles'>Latest Articles</h3>
      <ul>
        {data.articles.map((article) => (
          <li key={article.article_id}>
            <Link to={`/articles/${article.article_id}`}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ArticleList;