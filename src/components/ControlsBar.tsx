import React from "react";
import styles from "../styles/ControlsBar.module.css";
import { SearchBar } from "./SearchBar";
import { FilterBar } from "./FilterBar";
import { SortBar } from "./SortBar";

type ControlsBarProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
};

export const ControlsBar: React.FC<ControlsBarProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className={styles.controlsWrapper}>
      <div className={styles.controlItem}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className={styles.controlItem}>
        <FilterBar statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      </div>
      <div className={styles.controlItem}>
        <SortBar sortOrder={sortOrder} setSortOrder={setSortOrder} />
      </div>
    </div>
  );
};
