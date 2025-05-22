import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1 className="app-title">Northcoders News</h1>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
};

export default Header;