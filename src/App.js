import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const getFilmList = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const respond = await fetch("https://swapi.dev/api/films");
      if (!respond.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await respond.json();

      const listMovie = data.results.map(movie => {
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_datem,
          openingText: movie.opening_crawl,
        };
      });
      setMovies(listMovie);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  let content = <p>Not found movies</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={getFilmList}>Fetch Movies</button>
      </section>
      <section>{isLoading ? <p>Loading</p> : content}</section>
    </React.Fragment>
  );
}

export default App;
