const API_KEY = "2f0a6430";
const searchInput = document.getElementById("searchInput");
const emptyInfoDiv = document.getElementById("emptyInfo");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");
const resultContainer = document.getElementById("resultContainer");
let debounceTimeout;
// debounce
searchInput.addEventListener("input", (event) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = window.setTimeout(() => {
        searchTypeHandler(event);
    }, 400);
});
// handler
async function searchTypeHandler(event) {
    setDisplayEmpty(false);
    setDisplayError(false);
    const target = event.target;
    const value = (target.value || "").trim();
    if (!value || value.length < 3) {
        setDisplayEmpty(true);
        return;
    }
    const movies = await searchMovies(value);
    if (movies.length === 0) {
        resultContainer.innerHTML = "<p>No movies found</p>";
        setDisplayResults(true);
        return;
    }
    showMovies(movies);
}
// показ фільмів
function showMovies(movies) {
    let htmlToInsert = "";
    const moviesToShow = movies.toSorted((a, b) => Number(a.Year) - Number(b.Year));
    moviesToShow.forEach((movie) => {
        htmlToInsert += `
      <div class="movie">
        <div>
          <strong>${movie.Title}</strong>
          <div>Year: ${movie.Year}</div>
          <div>Type: ${movie.Type}</div>
        </div>
        <img 
          src="${movie.Poster !== "N/A" ? movie.Poster : ""}" 
          alt="Movie poster"
        >
      </div>
    `;
    });
    resultContainer.innerHTML = htmlToInsert;
    setDisplayResults(true);
}
// API
async function searchMovies(query) {
    setDisplayLoading(true);
    let movies = [];
    try {
        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
        const response = await fetch(url);
        const moviesData = await response.json();
        if (moviesData.Response === "False") {
            throw new Error(moviesData.Error || "Unknown error");
        }
        movies = moviesData.Search || [];
    }
    catch (error) {
        if (error instanceof Error) {
            errorDiv.innerText = error.message;
        }
        setDisplayError(true);
    }
    finally {
        setDisplayLoading(false);
    }
    return movies;
}
// UI helpers
function setDisplayResults(isShown) {
    resultContainer.classList.toggle("hidden", !isShown);
}
function setDisplayLoading(isShown) {
    loadingDiv.classList.toggle("hidden", !isShown);
}
function setDisplayError(isShown) {
    errorDiv.classList.toggle("hidden", !isShown);
}
function setDisplayEmpty(isShown) {
    emptyInfoDiv.classList.toggle("hidden", !isShown);
}
export {};
