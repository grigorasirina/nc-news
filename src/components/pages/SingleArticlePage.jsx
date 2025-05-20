import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch.js';
import ArticleDetail from '../features/ArticleDetail.jsx';

const SingleArticlePage = () => {
  const { article_id } = useParams(); 
  const backendBaseUrl = 'https://news-be-1493.onrender.com/api'; 
 const { data, isLoading, error } = useFetch(backendBaseUrl + '/articles/' + article_id);

  if (isLoading) {
    return <p>Loading article...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.article) {
    return <p>Article not found.</p>
  }

  return (
    <main>
      <ArticleDetail article={data.article} />
    </main>
  );
};

export default SingleArticlePage;