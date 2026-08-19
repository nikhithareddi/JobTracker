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
  const [editingJob, setEditingJob] = useState<JobApplication | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  const handleSaveJob = (jobData: Omit<JobApplication, 'id'>) => {
    if (editingJob) {
      setJobs((prev) =>
        prev.map((item) =>
          item.id === editingJob.id ? { ...jobData, id: editingJob.id } : item
        )
      );
      setEditingJob(null);
    } else {
      const newJob: JobApplication = {
        ...jobData,
        id: Date.now().toString(),
      };
      setJobs((prev) => [newJob, ...prev]);
    }
  };

  const handleDeleteJob = (id: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      setJobs((prev) => prev.filter((job) => job.id !== id));
    }
  };

  const handleEditJob = (job: JobApplication) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setEditingJob(null);
    setIsModalOpen(true);
  };

  const handleExportCSV = () => {
    if (jobs.length === 0) return;
    const headers = ['Company', 'Role', 'Date Applied', 'Status', 'Job URL', 'Notes'];
    const rows = jobs.map((j) => [
      `"${j.company}"`,
      `"${j.role}"`,
      `"${j.dateApplied}"`,
      `"${j.status}"`,
      `"${j.jobUrl || ''}"`,
      `"${j.notes || ''}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'job_applications.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      <Header onAddClick={handleOpenAddModal} />

      <MetricsBanner
        total={jobs.length}
        interviewing={jobs.filter((j) => j.status === 'Interview').length}
        offers={jobs.filter((j) => j.status === 'Offer').length}
        rejected={jobs.filter((j) => j.status === 'Rejected').length}
      />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="w-full sm:w-auto flex-1">
          <ControlsBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onFilterChange={setStatusFilter}
          />
        </div>
        <button
          onClick={handleExportCSV}
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors w-full sm:w-auto"
        >
          Export CSV
        </button>
      </div>

      <main className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Applications ({filteredJobs.length})
        </h2>
        <ApplicationTable
          jobs={filteredJobs}
          onDeleteJob={handleDeleteJob}
          onEditJob={handleEditJob}
        />
      </main>

      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingJob(null);
        }}
        onSaveJob={handleSaveJob}
        initialData={editingJob}
      />
    </div>
  );
}