import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopics } from '../../../Api';

const TopicNav = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchTopics()
      .then((fetchedTopics) => {
        setTopics(fetchedTopics);
      })
      .catch((err) => {
        setError('Failed to load topics.');
        console.error('Error fetching topics:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading topics...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <nav className="topic-nav">
      <ul>
        <li>
          <Link to="/">All Articles</Link>
        </li>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/articles/topic/${topic.slug}`}>{topic.slug}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopicNav;
