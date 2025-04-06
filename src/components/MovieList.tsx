import { JSX } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "../types";
import styles from "../styles/movielist.module.css";

interface MovieListProps {
  movies: Movie[];
  onDelete: (id: number) => void;
  onEdit: (movie: Movie) => void;
}

export default function MovieList({ movies, onDelete, onEdit }: MovieListProps): JSX.Element {
  if (movies.length === 0) {
    return <p className={styles.emptyMessage}>No movies found. Add some!</p>;
  }

  return (
    <div className={styles.movieGrid}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}