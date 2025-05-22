import axios from 'axios';

const newsApi = axios.create({
baseURL: 'https://be-nc-news-example-46vu.onrender.com/api',
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

export const postComment = (article_id, username, body) => {
  return newsApi.post(`/articles/${article_id}/comments`, { username, body })
    .then((response) => {
      return response.data.comment;
    })
    .catch((error) => {
      console.error("Error posting comment:", error);
      throw error;
    });
};

export const fetchCommentsByArticleId = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.comments;
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
      throw error;
    });
};