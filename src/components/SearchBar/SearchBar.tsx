"use client";
import { toast } from "react-hot-toast";
import css from "./SearchBar.module.css";
interface Props {
  onSubmit: (query: string) => void;
}

export const SearchBar = ({ onSubmit }: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("query")?.toString().trim() || "";

    if (!query) {
      toast.error("Введіть пошуковий запит.");
      return;
    }

    onSubmit(query);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input name="query" placeholder="Search..." />
      <button type="submit">Search</button>
    </form>
  );
};
