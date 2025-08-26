// JobPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// replaced import to use JobData and JobEditForm
import { JobEditForm } from "../components/JobEditForm";
import type { JobData } from "../components/JobCard";
import styles from "../styles/JobPage.module.css";
import { Button } from "../components/Button";

export const JobPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/jobs/${id}`);
        if (!res.ok) throw new Error("Job not found");
        const data: JobData = await res.json();
        setJob(data);
      } catch (error) {
        console.error(error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleUpdate = async (updatedJob: JobData) => {
    try {
      const res = await fetch(`http://localhost:3000/jobs/${updatedJob.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedJob),
      });
      if (!res.ok) throw new Error("Failed to update job");
      const data: JobData = await res.json();
      setJob(data);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("Error updating job.");
    }
  };

  const handleDelete = async () => {
    if (!job) return;
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the job at ${job.company} (${job.role})?`
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/jobs/${job.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete job");
      // navigate back to home after successful delete
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Error deleting job.");
    }
  };

  if (loading) {
    return <p className={styles.loading}>Loading job...</p>;
  }

  if (!job) {
    return <p className={styles.loading}>Job not found</p>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Link to="/home" className={styles.backBtn}>
          ← Back
        </Link>

        {isEditing ? (
          <JobEditForm
            job={job}
            onSave={handleUpdate}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <>
            <h2>
              {job.role} at {job.company}
            </h2>
            <p>
              <strong>Status:</strong> {job.status}
            </p>
            <p>
              <strong>Date Applied:</strong> {job.dateApplied}
            </p>
            {job.extraDetails && (
              <p>
                <strong>Additional Info:</strong> {job.extraDetails}
              </p>
            )}

            <div className={styles.actions}>
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
              <Button onClick={handleDelete} className={styles.deleteBtn}>
                Delete
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
