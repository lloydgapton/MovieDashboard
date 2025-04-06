import ErrorBoundary from "./components/ErrorBoundary";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";
import StatsSection from "./components/StatsSection";
import {useEffect, useState} from "react";
import { Movie } from "./types";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";
import { JSX } from "react";

const sampleMovies: Movie[] = [
  { id: 1, title: "Inception", year: 2010, genre: "Sci-Fi", rating: 8.8 },
  { id: 2, title: "Titanic", year: 1997, genre: "Romance", rating: 7.8 },
  { id: 3, title: "Avengers", year: 2012, genre: "Action", rating: 8.0 },
];

export default function App(): JSX.Element{
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load data from localStorage
  useEffect(() => {
    try {
      setLoading(true);
      const stored = JSON.parse(localStorage.getItem("movies") || "[]") as Movie[];
      setMovies(stored.length ? stored : sampleMovies);
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Failed to load movie data. Using default data.");
      setMovies(sampleMovies);
    } finally {
      setLoading(false);
    }
  }, []);

   // Save data to localStorage when movies change
   useEffect(() => {
    try {
      localStorage.setItem("movies", JSON.stringify(movies));
    } catch (err) {
      console.error("Error saving data:", err);
      setError("Failed to save your changes to local storage.");
    }
  }, [movies]);

  return(
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎬 Movie Dashboard</h1>
      
      /* Error Display */
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span>{error}</span>
          <button 
            className="absolute top-0 right-0 px-4 py-3" 
            onClick={clearError}
          >
            &times;
          </button>
        </div>
      )}

      /* Search Bar */
      <SearchBar value={search} onChange={handleSearchChange} />

      {/* Movie Form */}
      <ErrorBoundary fallback={<p>Something went wrong with the form. Please refresh.</p>}>
        <MovieForm 
          onSubmit={editId ? handleUpdateMovie : handleAddMovie}
          initialData={movieToEdit}
          isEditing={!!editId}
          onCancelEdit={() => setEditId(null)}
        />
      </ErrorBoundary>

      {/* Loading State */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          /* Movie List */
          <ErrorBoundary fallback={<p>Failed to load movie list. Please refresh.</p>}>
            <MovieList 
              movies={filteredMovies} 
              onDelete={handleDelete} 
              onEdit={handleEdit} 
            />
          </ErrorBoundary>

          /* Stats Section */
          <ErrorBoundary fallback={<p>Failed to load statistics. Please refresh.</p>}>
            <StatsSection movies={movies} />
          </ErrorBoundary>
        </>
      )}
    </div>
  );
}