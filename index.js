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
                displayMovies(data.Search);
            } else {
                alert("No movies found!");
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            alert("An error occurred while fetching data.");
        });
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById("movies");
    moviesContainer.innerHTML = ""; // Clear previous results

    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}" />
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
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
    movieDetails.classList.add("active");
}

// Load popular movies on page load
window.onload = () => {
    const url = `https://www.omdbapi.com/?apikey=8f810cc0&s=action`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.Response === "True") {
                displayMovies(data.Search);
            }
        });
};


// Function to save a movie to the watchlist
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

// Function to display movies
function displayMovies(movies) {
    const moviesContainer = document.getElementById("movies");
    moviesContainer.innerHTML = ""; // Clear previous results

    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}" />
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <button class="add-to-watchlist" onclick="addToWatchlist(${JSON.stringify(movie).replace(/"/g, '&quot;')})">Add to Watchlist</button>
        `;

        moviesContainer.appendChild(movieCard);
    });
}

// Load popular movies on page load
window.onload = () => {
    const url = `https://www.omdbapi.com/?apikey=8f810cc0&s=action`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.Response === "True") {
                displayMovies(data.Search);
            }
        });
};

// Function to fetch trending movies
function fetchTrendingMovies() {
    const url = `https://www.omdbapi.com/?apikey=8f810cc0&s=action`; // Example query for trending movies

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.Response === "True") {
                displayTrendingMovies(data.Search);
            } else {
                console.error("No trending movies found.");
            }
        })
        .catch((error) => {
            console.error("Error fetching trending movies:", error);
        });
}

// Function to display trending movies
function displayTrendingMovies(movies) {
    const trendingMoviesContainer = document.getElementById("trending-movies");
    trendingMoviesContainer.innerHTML = ""; // Clear previous results

    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}" />
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;

        trendingMoviesContainer.appendChild(movieCard);
    });
}

// Load trending movies on page load
window.onload = () => {
    fetchTrendingMovies();
};

// Function to fetch popular movies
function fetchPopularMovies() {
    const url = `https://www.omdbapi.com/?apikey=8f810cc0&s=popular`; // Example query for popular movies

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.Response === "True") {
                displayPopularMovies(data.Search);
            } else {
                console.error("No popular movies found.");
            }
        })
        .catch((error) => {
            console.error("Error fetching popular movies:", error);
        });
}

// Function to display popular movies
function displayPopularMovies(movies) {
    const moviesContainer = document.getElementById("movies");
    moviesContainer.innerHTML = ""; // Clear previous results

    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}" />
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <button class="add-to-watchlist" onclick="addToWatchlist(${JSON.stringify(movie).replace(/"/g, '&quot;')})">Add to Watchlist</button>
        `;

        moviesContainer.appendChild(movieCard);
    });
}

// Load popular movies on page load
window.onload = () => {
    fetchPopularMovies();
};

// Function to display movie details
function displayMovieDetails(movie) {
    const movieDetails = document.getElementById("movie-details");
    movieDetails.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}" />
        <h2>${movie.Title}</h2>
        <p>Year: ${movie.Year}</p>
        <p>Rating: ${movie.imdbRating}</p>
        <p>Plot: ${movie.Plot}</p>
    `;

    // Add social sharing buttons
    const shareUrl = encodeURIComponent(window.location.href); // URL of the current page
    const shareText = encodeURIComponent(`Check out this movie: ${movie.Title}`);

    // Facebook Share URL
    document.getElementById("share-facebook").href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;

    // Twitter Share URL
    document.getElementById("share-twitter").href = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;

    // WhatsApp Share URL
    document.getElementById("share-whatsapp").href = `https://wa.me/?text=${shareText}%20${shareUrl}`;

    movieDetails.classList.add("active");
}