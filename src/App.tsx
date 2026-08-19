import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MetricsBanner } from './components/MetricsBanner';
import { ControlsBar } from './components/ControlsBar';
import { ApplicationTable } from './components/ApplicationTable';
import { AddJobModal } from './components/AddJobModal';
import { MOCK_JOBS } from './data/mockJobs';
import { JobApplication } from './types/job';

const STORAGE_KEY = 'jobtracker_applications';

export default function App() {
  // Initialize from LocalStorage or fall back to MOCK_JOBS
  const [jobs, setJobs] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved jobs', e);
      }
    }
    return MOCK_JOBS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Save to LocalStorage whenever jobs change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  const handleAddJob = (newJob: Omit<JobApplication, 'id'>) => {
    const jobWithId: JobApplication = {
      ...newJob,
      id: Date.now().toString(),
    };
    setJobs((prev) => [jobWithId, ...prev]);
  };

  const handleDeleteJob = (id: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      setJobs((prev) => prev.filter((job) => job.id !== id));
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <Header onAddClick={() => setIsModalOpen(true)} />

      <MetricsBanner
        total={jobs.length}
        interviewing={jobs.filter((j) => j.status === 'Interview').length}
        offers={jobs.filter((j) => j.status === 'Offer').length}
        rejected={jobs.filter((j) => j.status === 'Rejected').length}
      />

      <ControlsBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onFilterChange={setStatusFilter}
      />

      <main className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Applications ({filteredJobs.length})
        </h2>
        <ApplicationTable jobs={filteredJobs} onDeleteJob={handleDeleteJob} />
      </main>

      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddJob={handleAddJob}
      />
    </div>
  );
}