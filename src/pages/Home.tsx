import React, { useState, useEffect } from 'react';
import { AddJobForm } from '../components/AddJobForm';
import { JobCard, type JobCardProps } from '../components/JobCard';
import styles from '../styles/Home.module.css';
import { Text } from '../components/Text';

export const Home: React.FC = () => {
  const [jobs, setJobs] = useState<JobCardProps[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch jobs from backend
  useEffect(() => {
    fetch('http://localhost:3000/jobs')
      .then(res => res.json())
      .then((data: JobCardProps[]) => setJobs(data))
      .catch(err => console.error(err));
  }, []);

  const handleToggleForm = () => {
    setShowAddForm(prev => !prev);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <Text variant="h1">Your Job Applications</Text>
        <button onClick={handleToggleForm} className={styles.addJobBtn}>
          {showAddForm ? 'Cancel' : 'Add Job'}
        </button>
      </div>

      {showAddForm && <AddJobForm setJobs={setJobs} />}

      <div className={styles.jobList}>
        {jobs.length === 0 ? (
          <Text variant="p">No jobs added yet.</Text>
        ) : (
          jobs.map(job => (
            <JobCard
              key={job.id}
              id={job.id}
              company={job.company}
              role={job.role}
              status={job.status}
              dateApplied={job.dateApplied}
              extraDetails={job.extraDetails}
              onUpdate={(updatedJob) =>
                setJobs((prevJobs) =>
                  prevJobs.map((j) => (j.id === updatedJob.id ? updatedJob : j))
                )
              }
              onDelete={(id) =>
                setJobs((prevJobs) => prevJobs.filter((j) => j.id !== id))
              }
            />
          ))
        )}
      </div>
    </div>
  );
};
