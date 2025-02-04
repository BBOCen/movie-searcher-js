document.addEventListener("DOMContentLoaded", () => {
    let search_button = document.getElementById("search-btn");
    let search_input= document.getElementById("search-box");

    search_button.addEventListener("click", async () => {
        let search_query = search_input.value.toLowerCase();
        let search_results = await fetchResults(search_query);
        printResults(search_results);
        console.log(search_results);
        console.log(search_query);
    });

    async function fetchResults(search_query) {
        let results = await fetch(`/search?query=${search_query}`);
        results = await results.json();
        return results;
    }

    function printResults(search_results) {
        let movie_container = document.getElementById("movies-container");

        for (let movie of search_results.results) {
            let movie_card = document.createElement("div");
            movie_card.classList.add("movie-card");
            movie_card.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>⭐ ${movie.vote_average} | 📅 ${movie.release_date}</p>
            `;
            movie_card.style.cursor = "pointer";
            movie_card.addEventListener("click", () => showDetails(movie));
            movie_container.append(movie_card);
        }
    }

    async function showDetails(movie) {
        let movie_details = document.getElementById("movie-details");
        movie_details.classList.remove("hidden");
        movie_details.style.zIndex = "10";
        document.body.classList.add("no-scroll");

        let trailer_link = await obtainTrailer(movie.id);
        let trailer_string = trailer_link ? `<a id="movie-trailer" href="${trailer_link}" target="_blank">🎥 Watch Trailer</a>` : "";

        movie_details.innerHTML = `
            <section id="movie-details">
                <button id="close-details">✖ Close</button>
                <div class="details-container">
                    <img id="movie-poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" onerror="this.onerror=null; this.src='./img/404.jpg';">
                    <div class="info">
                        <h2 id="movie-title">${movie.title}</h2>
                        <p id="movie-overview">${movie.overview}</p>
                        <p><strong>⭐ Rating:</strong> <span id="movie-rating">${movie.vote_average}</span></p>
                        <p><strong>📅 Release Date:</strong> <span id="movie-release">${movie.release_date}</span></p>
                        ${trailer_string}
                    </div>
                </div>
            </section>
        `;

        let close_btn = document.getElementById("close-details");
        close_btn.addEventListener("click", () => {
            movie_details.classList.add("hidden");
            movie_details.style.zIndex = "-10";
            document.body.classList.remove("no-scroll");
        });
    }

    async function obtainTrailer(movie_id) {
        let results = await fetch(`/movie/${movie_id}/videos`);
        results = await results.json();

        for (let video of results.results) {
            if (video.type === "Trailer") {
                return `https://www.youtube.com/watch?v=${video.key}`;
            }
        }
        return null;
    }
});
