interface SearchBarProps {
  onSubmit: (formData: FormData) => void;
}

export const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="query" placeholder="Search movies..." />
      <button type="submit">Search</button>
    </form>
  );
};
