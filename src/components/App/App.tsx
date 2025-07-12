"use client";

import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

import { SearchBar } from "../SearchBar/SearchBar";
import { MovieGrid } from "../MovieGrid/MovieGrid";
import { Loader } from "../Loader/Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { MovieModal } from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";

import type { Movie } from "../../types/movie";
import type { FetchMoviesResponse } from "../../services/movieService";

import "./App.css";
import css from "./App.module.css";

const useMovies = (query: string, page: number) => {
  const options: UseQueryOptions<FetchMoviesResponse, Error> = {
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
    placeholderData: (prev) => prev,
  };
  return useQuery(options);
};

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useMovies(query, page);
  useEffect(() => {
    if (isSuccess && data?.results.length === 0) {
      toast.error("Фільми не знайдено 🕵️");
    }
  }, [isSuccess, data]);
  const handleSearchAction = (formData: FormData) => {
    const newQuery = formData.get("query")?.toString().trim();
    if (!newQuery) {
      toast.error("Введіть запит для пошуку.");
      return;
    }
    setPage(1);
    setQuery(newQuery);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedMovie(null);
  }, [page, query]);

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearchAction} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && data && data.results.length === 0 && (
        <p className={css.noResults}>Нічого не знайдено 🕵️</p>
      )}

      {!isLoading && !isError && data && data.results.length > 0 && (
        <>
          <MovieGrid movies={data.results} onSelect={setSelectedMovie} />

          {data.total_pages > 1 && (
            <ReactPaginate
              pageCount={data.total_pages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
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
