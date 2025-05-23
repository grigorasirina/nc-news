import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticles } from '../../../Api';
import ArticleCard from '../features/ArticleCard';

const ArticlesByTopicPage = () => {
  const { topic_slug } = useParams();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchArticles(topic_slug)
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
      })
      .catch((err) => {
        setError('Failed to load articles for this topic.');
        console.error('Error fetching articles by topic:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [topic_slug]);

  if (loading) {
    return <p>Loading articles for {topic_slug}...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (articles.length === 0) {
    return <p>No articles found for the topic: {topic_slug}.</p>;
  }

  return (
    <main>
      <h2 className="topic-page-title">Articles on: {topic_slug}</h2>
      <div className="articles-grid"> 
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </main>
  );
};

export default ArticlesByTopicPage;
