import React, { useState, useEffect } from "react";
import styles from "../styles/JobCard.module.css";
import { type JobData } from "./JobCard";
import { Button } from "./Button";

interface JobEditFormProps {
  job: JobData;
  onSave: (updatedJob: JobData) => void;
  onCancel: () => void;
}

export const JobEditForm: React.FC<JobEditFormProps> = ({ job, onSave, onCancel }) => {
  const [editedCompany, setEditedCompany] = useState(job.company);
  const [editedRole, setEditedRole] = useState(job.role);
  const [editedStatus, setEditedStatus] = useState(job.status);
  const [editedDate, setEditedDate] = useState(job.dateApplied);
  const [editedDetails, setEditedDetails] = useState(job.extraDetails || "");

  // Ensure textarea is populated if job changes
  useEffect(() => {
    setEditedCompany(job.company);
    setEditedRole(job.role);
    setEditedStatus(job.status);
    setEditedDate(job.dateApplied);
    setEditedDetails(job.extraDetails || "");
  }, [job]);

  const handleSubmit = () => {
    onSave({
      ...job,
      company: editedCompany,
      role: editedRole,
      status: editedStatus,
      dateApplied: editedDate,
      extraDetails: editedDetails,
    });
  };

  return (
    <div className={styles.editForm} onClick={(e) => e.stopPropagation()}>
      <input value={editedCompany} onChange={(e) => setEditedCompany(e.target.value)} />
      <input value={editedRole} onChange={(e) => setEditedRole(e.target.value)} />
      <select
        value={editedStatus}
        onChange={(e) => setEditedStatus(e.target.value as JobData["status"])}
      >
        <option value="Applied">Applied</option>
        <option value="Interviewed">Interviewed</option>
        <option value="Rejected">Rejected</option>
      </select>
      <input type="date" value={editedDate} onChange={(e) => setEditedDate(e.target.value)} />
      <textarea value={editedDetails} onChange={(e) => setEditedDetails(e.target.value)} />
      <div className={styles.actions}>
        <Button onClick={handleSubmit}>Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
};
