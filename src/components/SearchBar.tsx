import { JSX } from "react";
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps): JSX.Element {
  return (
    <input
      className="border p-2 w-full mb-4 rounded"
      placeholder="Search by title..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search movies"
    />
  );
}