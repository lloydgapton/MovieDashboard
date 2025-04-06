import { JSX } from "react";
import { Button } from "./ui/Button";
import { Movie } from "../types";

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
    <div className="border p-4 rounded shadow-md flex justify-between items-center">
      <div>
        <h2 className="font-semibold">{movie.title} ({movie.year})</h2>
        <p>Genre: {movie.genre} | Rating: {movie.rating}</p>
      </div>
      <div className="flex gap-2">
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