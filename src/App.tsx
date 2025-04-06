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