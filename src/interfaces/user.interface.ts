export interface UserDetails {
    // Personal Information
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  
    // Internship Details
    internshipJoinedDate: Date;
    internshipCompletionDate: Date;
    isCertified: boolean;
    mentorName: string;
    mentorEmail?: string;
    mentorPhone?: string;
  
    // System Information
    createdAt: Date;
    updatedAt?: Date;
  }