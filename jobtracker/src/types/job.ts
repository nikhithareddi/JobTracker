export type ApplicationStatus = 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  dateApplied: string;
  status: ApplicationStatus;
  jobUrl?: string;
  notes?: string;
}