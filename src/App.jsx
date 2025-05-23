import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage.jsx';
import Header from './components/layout/Header.jsx';
import SingleArticlePage from './components/pages/SingleArticlePage.jsx';
import ArticlesByTopicPage from './components/pages/ArticlesByTopicPage.jsx';
import TopicNav from './components/features/TopicNav.jsx';
import './App.css';

const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <TopicNav />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles/:article_id" element={<SingleArticlePage />} />
          <Route path="/articles/topic/:topic_slug" element={<ArticlesByTopicPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;