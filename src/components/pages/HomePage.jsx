import React from 'react';
import ArticleList from '../features/ArticleList.jsx';

const HomePage = () => {
  return (
    <main>
      <h2 className="all-articles">All Articles</h2>
      <ArticleList />
    </main>
  );
};

export default HomePage;