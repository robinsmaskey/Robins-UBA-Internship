import { InternshipRepository } from "../repositories/internship.repository";
// import { InternshipDetails } from "../interfaces/internship.interface";
import { Internship } from '../entity/internship';

export class InternshipService {
  constructor(private internshipRepository: InternshipRepository) {}

  async createInternship(internshipData: Internship): Promise<Internship> {
    this.validateInternshipData(internshipData);
    const internship = await this.internshipRepository.create(internshipData);
    return this.mapToDetails(internship);
  }

  async getAllInternships(): Promise<Internship[]> {
    const internships = await this.internshipRepository.findAll();
    return internships.map(this.mapToDetails);
  }

  async getInternshipById(id: string): Promise<Internship> {
    const internship = await this.internshipRepository.findById(id);
    if (!internship) {
      throw new Error('Internship not found');
    }
    return this.mapToDetails(internship);
  }

  async getInternshipsByUserId(userId: string): Promise<Internship[]> {
    const internships = await this.internshipRepository.findByUserId(userId);
    return internships.map(this.mapToDetails);
  }

  async updateInternship(id: string, updates: Partial<Internship>): Promise<Internship> {
    const internship = await this.internshipRepository.update(id, updates);
    if (!internship) {
      throw new Error('Internship not found');
    }
    return this.mapToDetails(internship);
  }

  async deleteInternship(id: string): Promise<void> {
    await this.internshipRepository.delete(id);
  }

  private validateInternshipData(internshipData: Partial<Internship>): void {
    if (!internshipData.internship_title || !internshipData.joined_date) {
      throw new Error('Internship title and joined date are required');
    }

    if (internshipData.completion_date && 
        internshipData.completion_date < internshipData.joined_date) {
      throw new Error('Completion date cannot be before joined date');
    }
  }

  private mapToDetails(internship: Internship): Internship {
    return {
      id: internship.id,
      user: internship.user,
      internship_title: internship.internship_title,
      joined_date: internship.joined_date,
      completion_date: internship.completion_date,
      is_certified: internship.is_certified,
      mentor_name: internship.mentor_name,
      mentor_email: internship.mentor_email,
      mentor_phone: internship.mentor_phone,
      created_at: internship.created_at,
      updated_at: internship.updated_at
    };
  }
}
