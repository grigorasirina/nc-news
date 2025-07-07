NC News Frontend

Project Overview
This project is the front-end application for NC News, a Reddit-like social news aggregation site. It allows users to browse articles, view articles by topic, read comments, vote on articles, post new comments, and delete their own comments. This application consumes a custom-built backend API to fetch and manage data.

Features:
View a list of all articles.
Filter articles by topic.
View individual articles with their full content.
View comments associated with each article.
Vote on articles (optimistic rendering implemented).
Post new comments to articles.
Delete comments (only for comments posted by the current user, or if you implement user authentication/authorization).
Sort articles by date, comment count, votes, author, or title.
Toggle sorting order between ascending and descending.
Reflect sorting options in the URL for shareability.
Responsive design for various screen sizes.
Robust error handling.

How to Use the App
Browse Articles: Navigate to the homepage to see a list of all articles.

Filter by Topic: Use the navigation bar at the top to select different topics (e.g., 'coding', 'football', 'cooking') and view articles specific to that topic.

View Individual Article: Click on any article title to view its full content and associated comments.

Vote on Articles: On an individual article page, use the up/down arrows to vote. Your vote will update immediately (optimistic rendering).

Post Comments: Below an article, you can post a new comment.

Delete Comments: If you have implemented user authentication/authorization, you can delete comments you have posted.

Sort Articles: On the main articles page, use the "Sort by" and "Order" dropdowns to change how the articles are displayed. The URL will update to reflect your choices.

Deployed Version
You can access the live deployed version of this application here:
https://nc-news-irinag.netlify.app

Backend API
This front-end application consumes data from a separate backend API. You can find the repository for the backend here:
https://github.com/grigorasirina/News-BE

Running the Project Locally
To set up and run this project on your local machine, follow these steps:

Clone the repository:

git clone https://github.com/grigorasirina/nc-news

Install dependencies:

npm install
# or if you use yarn:
# yarn install

If your backend is local: Navigate to your backend project directory and start it (e.g., npm start or node app.js). Make sure your backend is running on http://localhost:9090 (or whatever port it's configured for) and that src/Api.js points to this local address.

Start the development server:

npm start
# or if you use yarn:
# yarn start

The application should open in your browser, typically at http://localhost:3000.

Minimum Node.js Version
This project requires Node.js version v23.9.0 or higher.
You can check your Node.js version by running node --version in your terminal.

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by Northcoders