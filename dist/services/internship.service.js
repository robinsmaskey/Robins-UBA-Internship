"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternshipService = void 0;
class InternshipService {
    constructor(internshipRepository) {
        this.internshipRepository = internshipRepository;
    }
    async createInternship(internshipData) {
        this.validateInternshipData(internshipData);
        const internship = await this.internshipRepository.create(internshipData);
        return this.mapToDetails(internship);
    }
    async getAllInternships() {
        const internships = await this.internshipRepository.findAll();
        return internships.map(this.mapToDetails);
    }
    async getInternshipById(id) {
        const internship = await this.internshipRepository.findById(id);
        if (!internship) {
            throw new Error('Internship not found');
        }
        return this.mapToDetails(internship);
    }
    async getInternshipsByUserId(userId) {
        const internships = await this.internshipRepository.findByUserId(userId);
        return internships.map(this.mapToDetails);
    }
    async updateInternship(id, updates) {
        const internship = await this.internshipRepository.update(id, updates);
        if (!internship) {
            throw new Error('Internship not found');
        }
        return this.mapToDetails(internship);
    }
    async deleteInternship(id) {
        await this.internshipRepository.delete(id);
    }
    validateInternshipData(internshipData) {
        if (!internshipData.internship_title || !internshipData.joined_date) {
            throw new Error('Internship title and joined date are required');
        }
        if (internshipData.completion_date &&
            internshipData.completion_date < internshipData.joined_date) {
            throw new Error('Completion date cannot be before joined date');
        }
    }
    mapToDetails(internship) {
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
exports.InternshipService = InternshipService;
