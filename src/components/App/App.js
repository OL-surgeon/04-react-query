"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { SearchBar } from "../SearchBar/SearchBar";
import { MovieGrid } from "../MovieGrid/MovieGrid";
import { Loader } from "../Loader/Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { MovieModal } from "../MovieModal/MovieModal";
import "./App.css";
import { fetchMovies } from "../../services/movieService";
const API_KEY = "8eb1c75e4a3c54065cc5bf123fd08d70"; // заміни на свій ключ
export default function App() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const handleSearch = async (query) => {
        setMovies([]);
        setLoading(true);
        setError(false);
        try {
            const results = await fetchMovies(query);
            if (results.length === 0) {
                toast.error("No movies found for your request.");
            }
            setMovies(results);
        }
        catch {
            setError(true);
        }
        finally {
            setLoading(false);
        }
    };
    const handleSearchAction = async (formData) => {
        const query = formData.get("query")?.toString().trim();
        if (!query) {
            toast.error("Please enter your search query.");
            return;
        }
        await handleSearch(query);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Toaster, { position: "top-right" }), _jsx(SearchBar, { action: handleSearchAction }), loading && _jsx(Loader, {}), error && _jsx(ErrorMessage, {}), !loading && !error && (_jsx(MovieGrid, { movies: movies, onSelect: setSelectedMovie })), selectedMovie && (_jsx(MovieModal, { movie: selectedMovie, onClose: () => setSelectedMovie(null) }))] }));
}
