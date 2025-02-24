// Function to search TV shows
function searchTVShows() {
    const inputPanel = document.getElementById("input");
    const query = inputPanel.value.trim();

    if (!query) {
        alert("Please enter a TV show name!");
        return;
    }

    const url = `https://www.omdbapi.com/?apikey=8f810cc0&s=${encodeURIComponent(query)}&type=series`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.Response === "True") {
                displayTVShows(data.Search);
            } else {
                alert("No TV shows found!");
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            alert("An error occurred while fetching data.");
        });
}

// Function to display TV shows
function displayTVShows(tvShows) {
    const tvShowsContainer = document.getElementById("tv-shows");
    tvShowsContainer.innerHTML = ""; // Clear previous results

    if (!tvShows || tvShows.length === 0) {
        tvShowsContainer.innerHTML = "<p>No TV shows found. Try another search!</p>";
        return;
    }

    tvShows.forEach((show) => {
        const showCard = document.createElement("div");
        showCard.classList.add("movie-card");

        showCard.innerHTML = `
            <img src="${show.Poster}" alt="${show.Title}" onerror="this.src='placeholder.jpg';" />
            <h3>${show.Title}</h3>
            <p>${show.Year}</p>
            <button class="add-to-watchlist" onclick="addToWatchlist(${JSON.stringify(show).replace(/"/g, '&quot;')})">Add to Watchlist</button>
        `;

        tvShowsContainer.appendChild(showCard);
    });
}

// Function to add a TV show to the watchlist
function addToWatchlist(show) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    if (!watchlist.some((s) => s.imdbID === show.imdbID)) {
        watchlist.push(show);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert(`${show.Title} added to watchlist!`);
    } else {
        alert(`${show.Title} is already in your watchlist!`);
    }
}

// Load popular TV shows on page load
window.onload = () => {
    const url = `https://www.omdbapi.com/?apikey=8f810cc0&s=series&type=series`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.Response === "True") {
                displayTVShows(data.Search);
            }
        })
        .catch((error) => {
            console.error("Error fetching popular TV shows:", error);
        });
};