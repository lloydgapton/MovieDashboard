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

    // Handlers
    const handleAddMovie = (newMovie: Omit<Movie, "id">): void => {
      try {
        setMovies((prev) => [...prev, { ...newMovie, id: Date.now() }]);
      } catch (err) {
        setError("Failed to add movie.");
      }
    };

    const handleUpdateMovie = (updatedMovie: Movie): void => {
      try {
        setMovies((prev) => 
          prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m))
        );
        setEditId(null);
      } catch (err) {
        setError("Failed to update movie.");
      }
    };

    const handleDelete = (id: number): void => {
      try {
        setMovies((prev) => prev.filter((m) => m.id !== id));
      } catch (err) {
        setError("Failed to delete movie.");
      }
    };

    const handleEdit = (movie: Movie): void => {
      setEditId(movie.id);
    };
  
    const handleSearchChange = (value: string): void => {
      setSearch(value);
    };
  
    const clearError = (): void => {
      setError(null);
    };

     // Filter movies based on search
  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  // Find movie being edited
  const movieToEdit = movies.find(m => m.id === editId);

  return(
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">🎬 Movie Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span>{error}</span>
          <button 
            className="absolute top-0 right-0 px-4 py-3 text-xl font-bold" 
            onClick={clearError}
          >
            &times;
          </button>
        </div>
      )}

      <div className="mb-6">
        <SearchBar value={search} onChange={handleSearchChange} />
      </div>

      <div className="mb-6">
        <ErrorBoundary fallback={<p>Something went wrong with the form. Please refresh.</p>}>
          <MovieForm 
            onSubmit={editId ? handleUpdateMovie : handleAddMovie}
            initialData={movieToEdit}
            isEditing={!!editId}
            onCancelEdit={() => setEditId(null)}
          />
        </ErrorBoundary>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-8">
            <ErrorBoundary fallback={<p>Failed to load movie list. Please refresh.</p>}>
              <MovieList 
                movies={filteredMovies} 
                onDelete={handleDelete} 
                onEdit={handleEdit} 
              />
            </ErrorBoundary>
          </div>

          <div>
            <ErrorBoundary fallback={<p>Failed to load statistics. Please refresh.</p>}>
              <StatsSection movies={movies} />
            </ErrorBoundary>
          </div>
        </>
      )}
    </div>
  );
}