import React, { useState, useEffect } from 'react';
import { JobApplication, ApplicationStatus } from '../types/job';

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveJob: (job: Omit<JobApplication, 'id'>) => void;
  initialData?: JobApplication | null;
}

export const AddJobModal: React.FC<AddJobModalProps> = ({
  isOpen,
  onClose,
  onSaveJob,
  initialData,
}) => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [status, setStatus] = useState<ApplicationStatus>('Applied');
  const [jobUrl, setJobUrl] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialData) {
      setCompany(initialData.company);
      setRole(initialData.role);
      setDateApplied(initialData.dateApplied);
      setStatus(initialData.status);
      setJobUrl(initialData.jobUrl || '');
      setNotes(initialData.notes || '');
    } else {
      setCompany('');
      setRole('');
      setDateApplied('');
      setStatus('Applied');
      setJobUrl('');
      setNotes('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !role || !dateApplied) return;

    onSaveJob({
      company,
      role,
      dateApplied,
      status,
      jobUrl,
      notes,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-semibold text-gray-800">
            {initialData ? 'Edit Application' : 'Add New Application'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Company Name *
            </label>
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Job Title *
            </label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Date Applied *
              </label>
              <input
                type="date"
                required
                value={dateApplied}
                onChange={(e) => setDateApplied(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
                className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Job Posting URL
            </label>
            <input
              type="url"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
              Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-sm text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              {initialData ? 'Update Application' : 'Save Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};