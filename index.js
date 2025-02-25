// Function to search movies
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

// Function to display movies
function displayMovies(movies, containerId) {
    const moviesContainer = document.getElementById(containerId);
    moviesContainer.innerHTML = ""; // Clear previous results

    if (!movies || movies.length === 0) {
        moviesContainer.innerHTML = "<p>No movies found. Try another search!</p>";
        return;
    }

    movies.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}" onerror="this.src='placeholder.jpg';" />
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <button class="add-to-watchlist" onclick="addToWatchlist(${JSON.stringify(movie).replace(/"/g, '&quot;')})">Add to Watchlist</button>
        `;

        movieCard.addEventListener("click", () => loadMovieDetails(movie.imdbID));
        moviesContainer.appendChild(movieCard);
    });
}

// Function to load movie details
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

    // Social sharing URLs
    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(`Check out this movie: ${movie.Title}`);

    document.getElementById("share-facebook").href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    document.getElementById("share-twitter").href = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
    document.getElementById("share-whatsapp").href = `https://wa.me/?text=${shareText}%20${shareUrl}`;

    movieDetails.classList.add("active");
}

// Function to add a movie to the watchlist
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

// Voice Search Functionality
function initializeVoiceSearch() {
    // Check if the browser supports the Web Speech API
    if (!('webkitSpeechRecognition' in window)) {
        alert("Your browser does not support voice search. Please use Chrome or another supported browser.");
        return;
    }

    // Initialize the speech recognition object
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false; // Stop after one command
    recognition.interimResults = false; // Only final results
    recognition.lang = "en-US"; // Set language

    // Get the search input and voice search button
    const searchInput = document.getElementById("input");
    const voiceSearchButton = document.getElementById("voice-search-button");

    // Add click event listener to the voice search button
    voiceSearchButton.addEventListener("click", () => {
        recognition.start(); // Start voice recognition
    });

    // Handle the result event
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript; // Get the spoken text
        searchInput.value = transcript; // Set the search input value
        search(); // Trigger the search function
    };

    // Handle errors
    recognition.onerror = (event) => {
        console.error("Voice search error:", event.error);
        alert("An error occurred during voice search. Please try again.");
    };
}

// Initialize the app
window.onload = function () {
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

    // Initialize voice search
    initializeVoiceSearch();
};