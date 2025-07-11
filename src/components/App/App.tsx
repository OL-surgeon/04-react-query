"use client";

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { SearchBar } from "../SearchBar/SearchBar";
import { MovieGrid } from "../MovieGrid/MovieGrid";
import { Loader } from "../Loader/Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { MovieModal } from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import "./App.css";
import { fetchMovies } from "../../services/movieService";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setLoading(true);
    setError(false);

    try {
      const { results } = await fetchMovies(query);

      if (results.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMovies(results);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchAction = async (formData: FormData) => {
    const query = formData.get("query")?.toString().trim();

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    await handleSearch(query);
  };

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar action={handleSearchAction} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}
