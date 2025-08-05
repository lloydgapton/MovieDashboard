import ErrorBoundary from "./components/ErrorBoundary";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieForm from "./components/MovieForm";
import StatsSection from "./components/StatsSection";
import {useEffect, useState, useRef} from "react";
import { Movie } from "./types";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";
import { JSX } from "react";
import "./App.module.css";
import styles from "./App.module.css";


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
  const formRef = useRef<HTMLDivElement>(null);

  // Load data from localStorage only once at initial mount
  useEffect(() => {
    try {
      setLoading(true);
      const stored = localStorage.getItem("movies");
      
      if (stored) {
        const parsedMovies = JSON.parse(stored) as Movie[];
        setMovies(parsedMovies);
      } else {
        // Only use sample movies if no data exists
        setMovies(sampleMovies);
        // Save sample movies to localStorage
        localStorage.setItem("movies", JSON.stringify(sampleMovies));
      }
    } catch (err) {
      console.error("Error loading data:", err);
      setError("Failed to load movie data. Using default data.");
      setMovies(sampleMovies);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array ensures this runs only once

  // Save data to localStorage when movies change
  useEffect(() => {
    // Skip initial save when loading is true
    if (!loading) {
      try {
        localStorage.setItem("movies", JSON.stringify(movies));
      } catch (err) {
        console.error("Error saving data:", err);
        setError("Failed to save your changes to local storage.");
      }
    }
  }, [movies, loading]);

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
    setTimeout(() => {
      // Focus on the form when editing starts)
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
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
    <div className={styles.appContainer} ref={formRef}>
      <h1 className={styles.appTitle}>🎬 Movie Dashboard</h1>

      {error && (
        <div className={styles.errorMessage}>
          <span>{error}</span>
          <button className={styles.closeBtn} onClick={clearError}>
            &times;
          </button>
        </div>
      )}

      <div className={styles.sectionSpacing}>
        <SearchBar value={search} onChange={handleSearchChange} />
      </div>

      <div className={styles.sectionSpacing}>
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
          <div className={styles.sectionSpacing}>
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