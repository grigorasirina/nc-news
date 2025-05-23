import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-message">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="not-found-link">Go to Homepage</Link>
    </div>
  );
};

export default NotFoundPage;