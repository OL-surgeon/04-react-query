"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./SearchBar.module.css";
export function SearchBar({ action }) {
    return (_jsx("header", { className: styles.header, children: _jsxs("div", { className: styles.container, children: [_jsx("a", { className: styles.link, href: "https://www.themoviedb.org/", target: "_blank", rel: "noopener noreferrer", children: "Powered by TMDB" }), _jsxs("form", { className: styles.form, action: action, children: [_jsx("input", { className: styles.input, type: "text", name: "query", autoComplete: "off", placeholder: "Search movies...", autoFocus: true }), _jsx("button", { className: styles.button, type: "submit", children: "Search" })] })] }) }));
}
