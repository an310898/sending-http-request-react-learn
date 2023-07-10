import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getFilmList = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const respond = await fetch(
        "https://react-http-1d49d-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json"
      );
      if (!respond.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await respond.json();
      console.log(data);

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openningText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getFilmList();
  }, [getFilmList]);

  const onAddMovieHandler = async movie => {
    const respond = await fetch(
      "https://react-http-1d49d-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      }
    );

    const status = await respond.status;
    if (status === 200) {
      getFilmList();
    }
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
        <AddMovie addMovie={onAddMovieHandler} />
      </section>
      <section>
        <button onClick={getFilmList}>Fetch Movies</button>
      </section>
      <section>{isLoading ? <p>Loading</p> : content}</section>
    </React.Fragment>
  );
}

export default App;
