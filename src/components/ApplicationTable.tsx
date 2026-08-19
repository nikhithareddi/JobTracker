import React from 'react';
import { JobApplication } from '../types/job';

interface ApplicationTableProps {
  jobs: JobApplication[];
  onDeleteJob : (id: string) => void;
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({ jobs, onDeleteJob, }) => {
  const getStatusBadge = (status: JobApplication['status']) => {
    const styles = {
      Applied: 'bg-blue-100 text-blue-800',
      Interview: 'bg-yellow-100 text-yellow-800',
      Offer: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
            <th className="p-4">Company</th>
            <th className="p-4">Role</th>
            <th className="p-4">Date Applied</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y text-sm">
          {jobs.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No applications found.
              </td>
            </tr>
          ) : (
            jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="p-4 font-semibold text-gray-800">
                  {job.company}
                  {job.jobUrl && (
                    <a
                      href={job.jobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-xs text-blue-500 hover:underline"
                    >
                      (Link)
                    </a>
                  )}
                </td>
                <td className="p-4 text-gray-600">{job.role}</td>
                <td className="p-4 text-gray-500">{job.dateApplied}</td>
                <td className="p-4">
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusBadge(
                      job.status
                    )}`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => onDeleteJob(job.id)}
                    className="text-red-600 hover:text-red-800 text-xs font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};