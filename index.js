function search() {
    const inputPanel = document.getElementById("input");
    const movieName = inputPanel.value.trim();

    if (!movieName) {
        alert("Please enter a movie name!");
        return;
    }

    const url = `https://www.omdbapi.com/?apikey=8f810cc0&s=${encodeURIComponent(movieName)}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.Response === "True") {
                displayMovies(data.Search, "movies");
            } else {
                alert("No movies found!");
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            alert("An error occurred while fetching data.");
        });
}

function displayMovies(movies, containerId) {
    const moviesContainer = document.getElementById(containerId);
    moviesContainer.innerHTML = "";

    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}" />
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <button class="add-to-watchlist" onclick="addToWatchlist(${JSON.stringify(movie).replace(/"/g, '&quot;')})">Add to Watchlist</button>
        `;

        movieCard.addEventListener("click", () => loadMovieDetails(movie.imdbID));
        moviesContainer.appendChild(movieCard);
    });
}

function loadMovieDetails(imdbID) {
    const url = `https://www.omdbapi.com/?apikey=8f810cc0&i=${imdbID}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.Response === "True") {
                displayMovieDetails(data);
            }
        })
        .catch((error) => {
            console.error("Error fetching movie details:", error);
        });
}

function displayMovieDetails(movie) {
    const movieDetails = document.getElementById("movie-details");
    movieDetails.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}" />
        <h2>${movie.Title}</h2>
        <p>Year: ${movie.Year}</p>
        <p>Rating: ${movie.imdbRating}</p>
        <p>Plot: ${movie.Plot}</p>
    `;

    // Social sharing URLs
    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(`Check out this movie: ${movie.Title}`);

    document.getElementById("share-facebook").href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    document.getElementById("share-twitter").href = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
    document.getElementById("share-whatsapp").href = `https://wa.me/?text=${shareText}%20${shareUrl}`;

    movieDetails.classList.add("active");
}

function addToWatchlist(movie) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (!watchlist.some((m) => m.imdbID === movie.imdbID)) {
        watchlist.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert(`${movie.Title} added to watchlist!`);
    } else {
        alert(`${movie.Title} is already in your watchlist!`);
    }
}

// Initialize the app
window.onload = function() {
    // Load popular movies
    fetch(`https://www.omdbapi.com/?apikey=8f810cc0&s=action`)
        .then((response) => response.json())
        .then((data) => {
            if (data.Response === "True") {
                displayMovies(data.Search, "movies");
            }
        });

    // Load trending movies (example: movies from 2023)
    fetch(`https://www.omdbapi.com/?apikey=8f810cc0&s=2023`)
        .then((response) => response.json())
        .then((data) => {
            if (data.Response === "True") {
                displayMovies(data.Search, "trending-movies");
            }
        });
};