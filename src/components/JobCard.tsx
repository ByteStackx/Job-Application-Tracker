import React, { useState } from "react";
import styles from "../styles/JobCard.module.css";
import { Text } from "./Text";
import { useNavigate } from "react-router";
import { JobEditForm } from "./JobEditForm";

// JobCard.tsx
export type JobData = {
  id: number;
  company: string;
  role: string;
  status: "Applied" | "Interviewed" | "Rejected";
  dateApplied: string;
  extraDetails?: string;
};

export type JobCardProps = JobData & {
  onUpdate: (updatedJob: JobData) => void;
  onDelete: (id: number) => void;
};


export const JobCard: React.FC<JobCardProps> = ({
  id,
  company,
  role,
  status,
  dateApplied,
  extraDetails,
  onUpdate,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const handleNavigate = () => {
    if (!isEditing) navigate(`/jobs/${id}`);
  };

  const handleUpdate = async (updatedJob: JobData) => {
    try {
      const response = await fetch(`http://localhost:3000/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedJob),
      });

      if (!response.ok) throw new Error("Failed to update job");

      onUpdate(updatedJob); // only pass JobData
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the job at ${company} (${role})?`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/jobs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete job");

      onDelete(id);
    } catch (error) {
      console.error(error);
    }
  };

  const statusClass =
    status === "Rejected"
      ? styles.rejected
      : status === "Interviewed"
      ? styles.interviewed
      : styles.applied;

  return (
    <div className={styles.card} onClick={handleNavigate}>
      {isEditing ? (
        <JobEditForm
          job={{ id, company, role, status, dateApplied, extraDetails }}
          onSave={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <Text variant="h2" className={styles.company}>{company}</Text>
          <Text variant="h3" className={styles.role}>{role}</Text>
          <Text variant="p" className={`${styles.status} ${statusClass}`}>
            Status: {status}
          </Text>
          <Text variant="p" className={styles.date}>Applied on: {dateApplied}</Text>
          {/* {extraDetails && <Text variant="p" className={styles.details}>{extraDetails}</Text>} */}

          <div className={styles.footer}>
            <div className={styles.actions}>
              <button onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>Edit</button>
              <button onClick={(e) => { e.stopPropagation(); handleDelete(); }} className={styles.deleteBtn}>
                Delete
              </button>
            </div>
            <span className={styles.viewMore}>View details →</span>
          </div>
        </>
      )}
    </div>
  );
};
