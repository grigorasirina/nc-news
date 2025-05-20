import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage.jsx';
import Header from './components/layout/Header.jsx';
import SingleArticlePage from './components/pages/SingleArticlePage.jsx';

const ArticlesByTopicPage = () => <div>Articles By Topic Page (Coming Soon!)</div>;

const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles/:article_id" element={<SingleArticlePage />} />
          <Route path="/topics/:topic_slug" element={<ArticlesByTopicPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;