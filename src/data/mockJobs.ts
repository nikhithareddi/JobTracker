import { JobApplication } from '../types/job';

export const MOCK_JOBS: JobApplication[] = [
  {
    id: '1',
    company: 'Google',
    role: 'Frontend Engineer',
    dateApplied: '2026-08-10',
    status: 'Interview',
    jobUrl: 'https://careers.google.com',
    notes: 'Passed initial recruiter screening.',
  },
  {
    id: '2',
    company: 'Meta',
    role: 'Product Designer',
    dateApplied: '2026-08-12',
    status: 'Applied',
  },
  {
    id: '3',
    company: 'Amazon',
    role: 'Software Engineer',
    dateApplied: '2026-08-01',
    status: 'Rejected',
  },
];