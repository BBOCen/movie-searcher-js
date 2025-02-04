document.addEventListener("DOMContentLoaded", () => {
    let search_button = document.getElementById("search-btn");
    let search_input = document.getElementById("search-box");

    //When the search button is clicked, initiate the search and fetch the results
    search_button.addEventListener("click", async () => {
        let search_query = search_input.value.toLowerCase();
        let search_results = await fetchResults(search_query);
        printResults(search_results);
    });

    //Function to fetch search results from the API
    async function fetchResults(search_query) {
        let results = await fetch(`https://movie-searcher-js.onrender.com/search?query=${search_query}`);
        //Parse the results as JSON
        results = await results.json();
        return results;
    }

    //Function to display the search results in the UI
    function printResults(search_results) {
        let movie_container = document.getElementById("movies-container");

        //Loop through each movie in the results in order to create a card with the movie
        for (let movie of search_results.results) {
            let movie_card = document.createElement("div");
            movie_card.classList.add("movie-card");
            movie_card.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" onerror="this.onerror=null; this.src='./img/404.jpg';" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>⭐ ${movie.vote_average} | 📅 ${movie.release_date}</p>
            `;
            movie_card.style.cursor = "pointer";
            movie_card.addEventListener("click", () => showDetails(movie));
            movie_container.append(movie_card);
        }
    }

    //Function to show movie details when a movie card is clicked
    async function showDetails(movie) {
        let movie_details = document.getElementById("movie-details");
        movie_details.classList.remove("hidden");
        movie_details.style.zIndex = "10";
        document.body.classList.add("no-scroll");

        //Fetch the trailer link for the movie
        let trailer_link = await obtainTrailer(movie.id);
        let trailer_string = trailer_link ? `<a id="movie-trailer" href="${trailer_link}" target="_blank">🎥 Watch Trailer</a>` : "";

        //Display the movie details in the UI
        movie_details.innerHTML = `
            <section id="movie-details">
                <button id="close-details">✖</button>
                <div class="details-container">
                    <img id="movie-poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" onerror="this.onerror=null; this.src='./img/404.jpg';">
                    <div class="info">
                        <h2 id="movie-title">${movie.title}</h2>
                        <p id="movie-overview">${movie.overview}</p>
                        <p><strong>⭐ Rating:</strong> <span id="movie-rating">${movie.vote_average}</span></p>
                        <p><strong>📅 Release Date:</strong> <span id="movie-release">${movie.release_date}</span></p>
                        ${trailer_string} <!-- Display the trailer link if available -->
                    </div>
                </div>
            </section>
        `;

        //Add event listener to close the details view
        let close_btn = document.getElementById("close-details");
        close_btn.addEventListener("click", () => {
            movie_details.classList.add("hidden");
            movie_details.style.zIndex = "-10";
            document.body.classList.remove("no-scroll");
        });
    }

    //Function to obtain the trailer link for a specific movie
    async function obtainTrailer(movie_id) {
        let results = await fetch(`https://movie-searcher-js.onrender.com/movie/${movie_id}/videos?language=en-US`);
        results = await results.json();

        //Loop through the results and find a trailer video
        for (let video of results.results) {
            if (video.type === "Trailer") {
                return `https://www.youtube.com/watch?v=${video.key}`;
            }
        }
        //Return null if no trailer is found
        return null;
    }
});
