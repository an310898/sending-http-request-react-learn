import { useRef } from "react";
import classes from "./AddMovie.module.css";

const AddMovie = props => {
  const inputNameRef = useRef();
  const inputOpeningTextRef = useRef();
  const inputDateRef = useRef();

  const onAddNewMovieHandler = e => {
    e.preventDefault();

    const movie = {
      title: inputNameRef.current.value,
      openingText: inputOpeningTextRef.current.value,
      releaseDate: inputDateRef.current.value,
    };

    props.addMovie(movie);
  };

  return (
    <form onSubmit={onAddNewMovieHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={inputNameRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="openingText">Opening text</label>
        <textarea type="text" id="openingText" ref={inputOpeningTextRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Release date</label>
        <input type="date" id="date" ref={inputDateRef} />
      </div>
      <button type="submit">Add new movie</button>
    </form>
  );
};

export default AddMovie;
