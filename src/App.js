import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getFilmList = async () => {
    setIsLoading(true);
    const respond = await fetch("https://swapi.dev/api/films");
    const data = await respond.json();

    const listMovie = data.results.map(movie => {
      console.log(movie);
      return {
        id: movie.episode_id,
        title: movie.title,
        releaseDate: movie.release_datem,
        openingText: movie.opening_crawl,
      };
    });
    setMovies(listMovie);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={getFilmList}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Not found movies</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
