"use client";

import { FormEvent } from "react";
import css from "./SearchBar.module.css";
import { toast } from "react-hot-toast";

interface SearchBarProps {
  action: (query: string) => void;
}

export const SearchBar = ({ action }: SearchBarProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query")?.toString().trim() || "";

    if (!query) {
      toast.error("Введіть пошуковий запит.");
      return;
    }

    action(query);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="query"
        placeholder="Search movies..."
        className={css.input}
        autoComplete="off"
        autoFocus
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
};
