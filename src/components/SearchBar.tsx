import { useState, KeyboardEvent } from "react";

interface SearchBarProps {
  onSearch: (cidade: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    if (value.trim()) onSearch(value.trim());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="busca">
      <input
        type="text"
        placeholder="Digite uma cidade..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
}