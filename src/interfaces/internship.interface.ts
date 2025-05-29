export interface InternshipDetails {
    id?: string;
    userId: string;
    internshipTitle: string;  // Changed from String to string
    internshipJoinedDate: Date;
    internshipCompletionDate?: Date;
    isCertified: boolean;
    mentorName: string;
    mentorEmail?: string;
    mentorPhone?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }