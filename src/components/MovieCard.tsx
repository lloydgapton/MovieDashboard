import { JSX } from "react";
import { Button } from "./ui/Button";
import { Movie } from "../types";
import styles from "../styles/moviecard.module.css"

interface MovieCardProps {
  movie: Movie;
  onDelete: (id: number) => void;
  onEdit: (movie: Movie) => void;
}

export default function MovieCard({ movie, onDelete, onEdit }: MovieCardProps): JSX.Element {
  const handleDelete = (): void => {
    if (window.confirm(`Are you sure you want to delete "${movie.title}"?`)) {
      onDelete(movie.id);
    }
  };

  return (
    <div className={styles.card}>
      <div>
        <h2 className={styles.title}>{movie.title} ({movie.year})</h2>
        <p>Genre: {movie.genre} | Rating: {movie.rating}</p>
      </div>
      <div className={styles.actions}>
        <Button small onClick={() => onEdit(movie)}>
          Edit
        </Button>
        <Button small danger onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
