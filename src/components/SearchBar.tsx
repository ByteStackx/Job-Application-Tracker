import React from "react";
import { TextInput } from "./TextInput";
import styles from "../styles/SearchBar.module.css";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className={styles.searchWrapper}>
      <TextInput
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search jobs by company, role, or status..."
        className={styles.searchInput}
      />

      <button
        type="button"
        onClick={() => setSearchTerm("")}
        className={styles.clearBtn}
        disabled={!searchTerm}
      >
        ✕
      </button>
    </div>
  );
};
