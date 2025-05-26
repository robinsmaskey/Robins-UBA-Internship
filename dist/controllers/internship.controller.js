"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternshipController = void 0;
class InternshipController {
    constructor(internshipService) {
        this.internshipService = internshipService;
    }
    async createInternship(req, res) {
        try {
            const internship = await this.internshipService.createInternship(req.body);
            res.status(201).json(internship);
        }
        catch (error) {
            if (error.message.includes('not found')) {
                res.status(404).json({ error: error.message });
            }
            else if (error.message.includes('required') || error.message.includes('cannot be before')) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    async getAllInternships(req, res) {
        try {
            const internships = await this.internshipService.getAllInternships();
            res.status(200).json(internships);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getInternshipById(req, res) {
        try {
            const internship = await this.internshipService.getInternshipById(req.params.id);
            res.status(200).json(internship);
        }
        catch (error) {
            if (error.message.includes('not found')) {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    async getInternshipsByUser(req, res) {
        try {
            const internships = await this.internshipService.getInternshipsByUserId(req.params.userId);
            res.status(200).json(internships);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async updateInternship(req, res) {
        try {
            const updatedInternship = await this.internshipService.updateInternship(req.params.id, req.body);
            res.status(200).json(updatedInternship);
        }
        catch (error) {
            if (error.message.includes('not found')) {
                res.status(404).json({ error: error.message });
            }
            else if (error.message.includes('required') || error.message.includes('cannot be before')) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    async deleteInternship(req, res) {
        try {
            await this.internshipService.deleteInternship(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            if (error.message.includes('not found')) {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}
exports.InternshipController = InternshipController;
