const API_KEY = "2f0a6430";

interface Movie {
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

interface MoviesResponse {
  Search?: Movie[];
  Response: "True" | "False";
  Error?: string;
}

const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const emptyInfoDiv = document.getElementById("emptyInfo") as HTMLDivElement;
const errorDiv = document.getElementById("error") as HTMLDivElement;
const loadingDiv = document.getElementById("loading") as HTMLDivElement;
const resultContainer = document.getElementById("resultContainer") as HTMLDivElement;

let debounceTimeout: number;

searchInput.addEventListener("input", (event: Event) => {
  clearTimeout(debounceTimeout);

  debounceTimeout = window.setTimeout(() => {
    void searchTypeHandler(event);
  }, 400);
});

async function searchTypeHandler(event: Event): Promise<void> {
  setDisplayEmpty(false);
  setDisplayError(false);

  const target = event.target as HTMLInputElement;
  const value = target.value.trim();

  if (!value || value.length < 3) {
    setDisplayEmpty(true);
    setDisplayResults(false);
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

function showMovies(movies: Movie[]): void {
  const moviesToShow = movies
    .slice()
    .sort((a: Movie, b: Movie) => Number(a.Year) - Number(b.Year));

  const htmlToInsert = moviesToShow
    .map((movie: Movie) => `
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
    `)
    .join("");

  resultContainer.innerHTML = htmlToInsert;
  setDisplayResults(true);
}

async function searchMovies(query: string): Promise<Movie[]> {
  setDisplayLoading(true);

  try {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network error");
    }

    const moviesData: MoviesResponse = await response.json();

    if (moviesData.Response === "False") {
      throw new Error(moviesData.Error || "No data");
    }

    return moviesData.Search ?? [];
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorDiv.innerText = error.message;
    } else {
      errorDiv.innerText = "Unknown error";
    }

    setDisplayError(true);
    return [];
  } finally {
    setDisplayLoading(false);
  }
}

function setDisplayResults(isShown: boolean): void {
  resultContainer.classList.toggle("hidden", !isShown);
}

function setDisplayLoading(isShown: boolean): void {
  loadingDiv.classList.toggle("hidden", !isShown);
}

function setDisplayError(isShown: boolean): void {
  errorDiv.classList.toggle("hidden", !isShown);
}

function setDisplayEmpty(isShown: boolean): void {
  emptyInfoDiv.classList.toggle("hidden", !isShown);
}