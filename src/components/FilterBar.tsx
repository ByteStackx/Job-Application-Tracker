import React from "react";
import styles from "../styles/FilterBar.module.css";

interface FilterBarProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ statusFilter, setStatusFilter }) => {
  return (
    <div className={styles.filterWrapper}>
      <label className={styles.label}>Filter:</label>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className={styles.select}
      >
        <option value="All">All</option>
        <option value="Applied">Applied</option>
        <option value="Interviewed">Interviewed</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  );
};
