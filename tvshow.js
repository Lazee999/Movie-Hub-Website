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

function displayTVShows(tvShows) {
    const tvShowsContainer = document.getElementById("tv-shows");
    tvShowsContainer.innerHTML = ""; // Clear previous results

    tvShows.forEach((show) => {
        const showCard = document.createElement("div");
        showCard.classList.add("movie-card");

        showCard.innerHTML = `
            <img src="${show.Poster}" alt="${show.Title}" />
            <h3>${show.Title}</h3>
            <p>${show.Year}</p>
        `;

        tvShowsContainer.appendChild(showCard);
    });
}