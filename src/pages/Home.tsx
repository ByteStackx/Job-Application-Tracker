import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AddJobForm } from "../components/AddJobForm";
import { JobCard, type JobCardProps, type JobData } from "../components/JobCard";
import { ControlsBar } from "../components/ControlsBar";
import styles from "../styles/Home.module.css";
import { Text } from "../components/Text";
import Footer from "../components/Footer";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const [jobs, setJobs] = useState<JobCardProps[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "All");
  const [sortOrder, setSortOrder] = useState(searchParams.get("sort") || "Newest");
  const navigate = useNavigate();

  useEffect(() => {
    const params: Record<string, string> = {};

    if (searchTerm.trim()) params.search = searchTerm;
    if (statusFilter !== "All") params.status = statusFilter; 
    if (sortOrder) params.sort = sortOrder;

    setSearchParams(params, { replace: true });
  }, [searchTerm, statusFilter, sortOrder, setSearchParams]);

  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((data: JobData[]) => {
        const jobsWithHandlers = data.map((job) => ({
          ...job,
          onUpdate: handleUpdate,
          onDelete: handleDelete,
        }));
        setJobs(jobsWithHandlers);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleToggleForm = () => setShowAddForm((prev) => !prev);

  // Update job in state
  const handleUpdate = (updatedJob: JobData) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === updatedJob.id
          ? { ...updatedJob, onUpdate: handleUpdate, onDelete: handleDelete }
          : job
      )
    );
  };

  // Delete job from state
  const handleDelete = (id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  // --- filtering, searching, sorting logic ---
  const filteredJobs = jobs
    .filter((job) =>
      statusFilter === "All" ? true : job.status === statusFilter
    )
    .filter((job) =>
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "Newest") {
        return new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime();
      } else {
        return new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime();
      }
    });

    const handleLogout = () => {
      localStorage.removeItem("user");
      navigate("/");
    };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <Text variant="h1">Your Job Applications</Text>
        <div className={styles.headerButtons}>
          <button onClick={handleToggleForm} className={styles.addJobBtn}>
            {showAddForm ? "Cancel" : "Add Job"}
          </button>
          <Button onClick={handleLogout} className={styles.logoutBtn}>Logout</Button>
        </div>
        
      </div>

      {showAddForm && (
        <AddJobForm setJobs={setJobs} onClose={() => setShowAddForm(false)} />
      )}

      <ControlsBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <div className={styles.jobList}>
        {filteredJobs.length === 0 ? (
          <Text variant="p">No jobs found.</Text>
        ) : (
          filteredJobs.map((job) => <JobCard key={job.id} {...job} />)
        )}
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};
