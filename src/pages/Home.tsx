import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AddJobForm } from "../components/AddJobForm";
import { JobCard, type JobCardProps } from "../components/JobCard";
import { SearchBar } from "../components/SearchBar";
import { FilterBar } from "../components/FilterBar";
import styles from "../styles/Home.module.css";
import { Text } from "../components/Text";

export const Home: React.FC = () => {
  const [jobs, setJobs] = useState<JobCardProps[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";
  const statusFilter = searchParams.get("status") || "";

  // Fetch jobs
  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, []);

  const handleToggleForm = () => {
    setShowAddForm((prev) => !prev);
  };

  const setSearchTerm = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  };

  const setStatusFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }
    setSearchParams(params);
  };

  // Apply filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter ? job.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <Text variant="h1">Your Job Applications</Text>
        <button onClick={handleToggleForm} className={styles.addJobBtn}>
          {showAddForm ? "Cancel" : "Add Job"}
        </button>
      </div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterBar statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

      {showAddForm && <AddJobForm setJobs={setJobs} />}

      <div className={styles.jobList}>
        {filteredJobs.length === 0 ? (
          <Text variant="p">No jobs found.</Text>
        ) : (
          filteredJobs.map((job) => (
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
