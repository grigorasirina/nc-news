import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Northcoders News</h1>
      <nav>
        <Link to="/">Home</Link>
        {/*  navigation links */}
      </nav>
    </header>
  );
};

export default Header;