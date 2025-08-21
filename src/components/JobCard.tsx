import React, { useState } from 'react';
import styles from '../styles/JobCard.module.css';
import { Text } from './Text';

export type JobCardProps = {
  id: number;
  company: string;
  role: string;
  status: 'Applied' | 'Interviewed' | 'Rejected';
  dateApplied: string;
  extraDetails?: string;
  onUpdate: (updatedJob: JobCardProps) => void;
  onDelete: (id: number) => void; // NEW PROP
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedCompany, setEditedCompany] = useState(company);
  const [editedRole, setEditedRole] = useState(role);
  const [editedStatus, setEditedStatus] = useState(status);
  const [editedDate, setEditedDate] = useState(dateApplied);
  const [editedDetails, setEditedDetails] = useState(extraDetails || '');

  const statusClass =
    status === 'Rejected'
      ? styles.rejected
      : status === 'Interviewed'
      ? styles.interviewed
      : styles.applied;

  const handleUpdate = async () => {
    const updatedJob: JobCardProps = {
      id,
      company: editedCompany,
      role: editedRole,
      status: editedStatus,
      dateApplied: editedDate,
      extraDetails: editedDetails,
      onUpdate,
      onDelete,
    };

    try {
      const response = await fetch(`http://localhost:3000/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedJob),
      });

      if (!response.ok) throw new Error('Failed to update job');

      onUpdate(updatedJob);
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
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete job');

      onDelete(id); // update parent state
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className={styles.card}>
      {isEditing ? (
        <div className={styles.editForm}>
          <input
            value={editedCompany}
            onChange={(e) => setEditedCompany(e.target.value)}
          />
          <input
            value={editedRole}
            onChange={(e) => setEditedRole(e.target.value)}
          />
          <select
            value={editedStatus}
            onChange={(e) =>
              setEditedStatus(e.target.value as 'Applied' | 'Interviewed' | 'Rejected')
            }
          >
            <option value="Applied">Applied</option>
            <option value="Interviewed">Interviewed</option>
            <option value="Rejected">Rejected</option>
          </select>
          <input
            type="date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
          />
          <textarea
            value={editedDetails}
            onChange={(e) => setEditedDetails(e.target.value)}
          />
          <div className={styles.actions}>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <Text variant="h2" className={styles.company}>{company}</Text>
          <Text variant="h3" className={styles.role}>{role}</Text>
          <Text variant="p" className={`${styles.status} ${statusClass}`}>
            Status: {status}
          </Text>
          <Text variant="p" className={styles.date}>Applied on: {dateApplied}</Text>
          {extraDetails && <Text variant="p" className={styles.details}>{extraDetails}</Text>}

          <div className={styles.actions}>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete} className={styles.deleteBtn}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};
