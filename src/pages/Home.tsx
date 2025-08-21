import React, { useState, useEffect } from 'react';
import { AddJobForm } from '../components/AddJobForm';
import { JobCard, type JobCardProps } from '../components/JobCard';
import { SearchBar } from '../components/SearchBar';
import styles from '../styles/Home.module.css';
import { Text } from '../components/Text';
import { useSearchParams } from 'react-router';

export const Home: React.FC = () => {
  const [jobs, setJobs] = useState<JobCardProps[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';

  // Fetch jobs from backend
  useEffect(() => {
    fetch('http://localhost:3000/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error(err));
  }, []);

  const handleToggleForm = () => {
    setShowAddForm(prev => !prev);
  };

  const handleSearchChange = (value: string) => {
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) =>
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <Text variant="h1">Your Job Applications</Text>
        <button onClick={handleToggleForm} className={styles.addJobBtn}>
          {showAddForm ? 'Cancel' : 'Add Job'}
        </button>
      </div>

      <SearchBar searchTerm={searchQuery} setSearchTerm={handleSearchChange} />

      {showAddForm && <AddJobForm setJobs={setJobs} />}

      <div className={styles.jobList}>
        {filteredJobs.length === 0 ? (
          <Text variant="p">No jobs found.</Text>
        ) : (
          filteredJobs.map(job => (
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
