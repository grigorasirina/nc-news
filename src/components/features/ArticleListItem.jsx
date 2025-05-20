import { Link } from 'react-router-dom';

const ArticleListItem = ({ article }) => {
  return (
    <li>
      <Link to={`/articles/${article.article_id}`}>
        {article.title}
      </Link>
    </li>
  );
};

export default ArticleListItem;