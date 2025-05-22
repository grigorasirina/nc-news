import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch.js';
import ArticleDetail from '../features/ArticleDetail.jsx';
import CommentList from '../features/CommentList.jsx';

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

  if (isArticleLoading || isCommentsLoading) {
    return <p>Loading content...</p>;
  }

  if (articleError) {
    console.error("Error loading article:", articleError);
    return <p>Error loading article: {articleError.message}</p>;
  }

  if (commentsError) {
    console.error("Error loading comments:", commentsError);
    return <p>Error loading comments: {commentsError.message}</p>;
  }

  if (!articleData || !articleData.article) {
    return <p>Article not found.</p>;
  }

const commentsToDisplay = commentsData && Array.isArray(commentsData.comments)
    ? commentsData.comments
    : [];

  return (
    <main>
      <ArticleDetail article={articleData.article} />
      <CommentList comments={commentsToDisplay} /> 
    </main>
  );
};

export default SingleArticlePage;