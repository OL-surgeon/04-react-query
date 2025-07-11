"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./MovieModal.module.css";
export const MovieModal = ({ movie, onClose }) => {
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape")
                onClose();
        };
        const disableScroll = () => {
            document.body.style.overflow = "hidden";
        };
        const enableScroll = () => {
            document.body.style.overflow = "";
        };
        window.addEventListener("keydown", handleKey);
        disableScroll();
        return () => {
            window.removeEventListener("keydown", handleKey);
            enableScroll();
        };
    }, [onClose]);
    const handleBackdrop = (e) => {
        if (e.target === e.currentTarget)
            onClose();
    };
    return createPortal(_jsx("div", { className: css.backdrop, onClick: handleBackdrop, role: "dialog", "aria-modal": "true", children: _jsxs("div", { className: css.modal, children: [_jsx("button", { className: css.closeButton, "aria-label": "Close modal", onClick: onClose, children: "\u00D7" }), _jsx("img", { src: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`, alt: movie.title, className: css.image }), _jsxs("div", { className: css.content, children: [_jsx("h2", { children: movie.title }), _jsx("p", { children: movie.overview }), _jsxs("p", { children: [_jsx("strong", { children: "Release Date:" }), " ", movie.release_date] }), _jsxs("p", { children: [_jsx("strong", { children: "Rating:" }), " ", movie.vote_average, "/10"] })] })] }) }), document.body);
};
