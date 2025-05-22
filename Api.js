import axios from 'axios';

const newsApi = axios.create({
baseURL: 'https://news-be-1493.onrender.com/api',
});

export const patchArticleVotes = (article_id, inc_votes) => {
  return newsApi.patch(`/articles/${article_id}`, { inc_votes })
    .then((response) => {
      return response.data.article;
    })
    .catch((error) => {
      console.error("Error patching article votes:", error);
      throw error;
    });
};