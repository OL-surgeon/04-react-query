import axios from "axios";
import type { Movie } from "../types/movie";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
if (!API_TOKEN) {
  throw new Error("TMDB token is missing. Перевір .env файл і VITE_TMDB_TOKEN");
}
interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (
  query: string,
  page = 1
): Promise<FetchMoviesResponse> => {
  const response = await axios.get<FetchMoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page,
      },
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );

  return response.data;
};
