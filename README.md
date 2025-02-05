# 🎥 Movie Searcher App 🎥

This project is a **Movie Searcher App** built with **Node.js** and **Express.js**, utilizing **The Movie Database (TMDb) API** to provide users with a search tool to find movie details, including trailers, ratings, and release dates. The frontend is built with **HTML**, **CSS**, and **JavaScript**, allowing for an interactive and dynamic user experience.

## 🚀 Key Features
### 🔹 Backend (API with Node.js & Express.js)
- **Movie search functionality**: Allows users to search for movies by name.
- **Fetch movie trailers**: Retrieves and displays YouTube trailer links for the selected movie.
- **Static file serving**: Serves static files (HTML, CSS, JS) from the server.
- **CORS enabled**: Supports cross-origin requests to allow frontend access from different domains.

### 🔹 Frontend (User Interface)
- **Movie search interface**: Users can enter a movie title, and the app will display matching results, including movie posters and ratings.
- **Interactive movie cards**: Each result is displayed in a clickable movie card that shows detailed information when selected.
- **Movie details view**: Displays detailed information including the movie's description, rating, release date, and a link to the trailer.
- **Responsive design**: The app is optimized for both desktop and mobile devices.

## 🌐 How to Run
1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/movie-searcher-app.git
    ```
2. **Install dependencies**:
    ```bash
    cd movie-searcher-app
    npm install
    ```
3. **Set up environment variables**:
    - Create a `.env` file in the root directory.
    - Add your **TMDb API key** as follows:
    ```bash
    TMDB_API_KEY=your_tmdb_api_key_here
    ```
4. **Start the server**:
    ```bash
    npm start
    ```
5. Access the app at `http://localhost:3000`.

## 🌍 Try the Live Version
You can test the live version of the app hosted on [Render here](https://movie-searcher-js.onrender.com).

## 🔒 Notes
- **API Key**: The application uses a **TMDb API key** to fetch movie data. You must provide your own API key in the `.env` file to run the app, if running it locally.
