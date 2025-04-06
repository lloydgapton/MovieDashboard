import { JSX } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "../types";

interface MovieListProps {
  movies: Movie[];
  onDelete: (id: number) => void;
  onEdit: (movie: Movie) => void;
}

export default function MovieList({ movies, onDelete, onEdit }: MovieListProps): JSX.Element {
  if (movies.length === 0) {
    return <p className="text-gray-500 my-4">No movies found. Add some!</p>;
  }

  return (
    <div className="grid gap-4 mb-8">
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