import React, { useState, useEffect } from "react";
import { AddJobForm } from "../components/AddJobForm";
import { JobCard, type JobCardProps } from "../components/JobCard";
import { ControlsBar } from "../components/ControlsBar";
import styles from "../styles/Home.module.css";
import { Text } from "../components/Text";
import { useSearchParams } from "react-router-dom";

export const Home: React.FC = () => {
  const [jobs, setJobs] = useState<JobCardProps[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // search params for query, filter and sort
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("q") || "";
  const statusFilter = searchParams.get("status") || "";
  const sortOrder = searchParams.get("sort") || "";

  // Fetch jobs from backend
  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error(err));
  }, []);

  const handleToggleForm = () => {
    setShowAddForm((prev) => !prev);
  };

  // handlers for ControlsBar
  const handleSearchChange = (value: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      return params;
    });
  };

  const handleFilterChange = (value: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set("status", value);
      } else {
        params.delete("status");
      }
      return params;
    });
  };

  const handleSortChange = (value: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set("sort", value);
      } else {
        params.delete("sort");
      }
      return params;
    });
  };

  // derived filtered + sorted jobs
  const filteredJobs = jobs
    .filter((job) =>
      searchTerm
        ? job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.role.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    )
    .filter((job) => (statusFilter ? job.status === statusFilter : true))
    .sort((a, b) => {
      if (!sortOrder) return 0;
      const dateA = new Date(a.dateApplied).getTime();
      const dateB = new Date(b.dateApplied).getTime();
      return sortOrder === "asc" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <Text variant="h1">Your Job Applications</Text>
        <button onClick={handleToggleForm} className={styles.addJobBtn}>
          {showAddForm ? "Cancel" : "Add Job"}
        </button>
      </div>

      {showAddForm && (
        <AddJobForm 
          setJobs={setJobs} 
          onSuccess={() => setShowAddForm(false)} // 👈 closes form
        />
      )}


      {/* Controls bar for search, filter, sort */}
      <ControlsBar
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
        statusFilter={statusFilter}
        setStatusFilter={handleFilterChange}
        sortOrder={sortOrder}
        setSortOrder={handleSortChange}
      />

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