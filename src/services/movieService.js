import axios from "axios";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
export const fetchMovies = async (query) => {
    const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
        params: {
            query,
            include_adult: false,
            language: "en-US",
            page: 1,
        },
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
        },
    });
    return response.data.results;
};
