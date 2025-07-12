import axios from "axios";
const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";
export const fetchMovies = async (query, page = 1) => {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
            query,
            page,
            include_adult: false,
            language: "en-US",
        },
        headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            Accept: "application/json",
        },
    });
    return response.data;
};
