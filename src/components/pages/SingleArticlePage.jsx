import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch.js';
import ArticleDetail from '../features/ArticleDetail.jsx';

const SingleArticlePage = () => {
  const { article_id } = useParams(); 
  const backendBaseUrl = 'https://be-nc-news-example-46vu.onrender.com/api';

const {
    data: articleData,
    isLoading: isArticleLoading,
    error: articleError
  } = useFetch(`${backendBaseUrl}/articles/${article_id}`);

  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    error: commentsError
  } = useFetch(`${backendBaseUrl}/articles/${article_id}/comments`);

  if (isArticleLoading) {
    return <p>Loading content...</p>;
  }

  if (articleError) {
    console.error("Error loading article:", articleError);
    return <p>Error loading article: {articleError.message}</p>;
  }

  if (!articleData || !articleData.article) {
    return <p>Article not found.</p>;
  }

  return (
    <main>
      <ArticleDetail article={articleData.article} />
    </main>
  );
};

export default SingleArticlePage;