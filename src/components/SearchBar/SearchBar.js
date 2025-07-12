import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { toast } from "react-hot-toast";
import styles from "./SearchBar.module.css";
export const SearchBar = ({ action }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const query = formData.get("query")?.toString().trim();
        if (!query) {
            toast.error("Please enter your search query.");
            return;
        }
        action(formData);
        form.reset();
    };
    return (_jsx("header", { className: styles.header, children: _jsxs("div", { className: styles.container, children: [_jsx("a", { className: styles.link, href: "https://www.themoviedb.org/", target: "_blank", rel: "noopener noreferrer", children: "Powered by TMDB" }), _jsxs("form", { className: styles.form, onSubmit: handleSubmit, children: [_jsx("input", { className: styles.input, type: "text", name: "query", autoComplete: "off", placeholder: "Search movies...", autoFocus: true }), _jsx("button", { className: styles.button, type: "submit", children: "Search" })] })] }) }));
};
