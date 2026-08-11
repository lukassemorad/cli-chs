export type EnrollmentStatus = 'zaplaceno' | 'čeká na platbu';

export interface EnrolledUser {
  name: string;
  email: string;
  registeredAt: string;
  status: EnrollmentStatus;
}
