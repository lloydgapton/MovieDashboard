import { JSX } from "react";
import styles from "../styles/searchbar.module.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps): JSX.Element {
  return (
    <input
      className={styles.input}
      placeholder="Search by title..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search movies"
    />
  );
}