// Function to display watchlist movies
function displayWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const watchlistContainer = document.getElementById("watchlist-movies");

    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = "<p>Your watchlist is empty.</p>";
        return;
    }

    watchlistContainer.innerHTML = ""; // Clear previous results

    watchlist.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}" />
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;

        watchlistContainer.appendChild(movieCard);
    });
}

// Load watchlist on page load
window.onload = displayWatchlist;