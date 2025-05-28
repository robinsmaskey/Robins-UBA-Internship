import { Request, Response } from 'express';
import { InternshipService } from '../services/internship.service';
import { InternshipDetails } from '../interfaces/internship.interface';

export class InternshipController {
  constructor(private internshipService: InternshipService) {}

  async createInternship(req: Request, res: Response) {
    try {
      const internship = await this.internshipService.createInternship(req.body);
      res.status(201).json(internship);
    } catch (error: any) {
      if (error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else if (error.message.includes('required') || error.message.includes('cannot be before')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async getAllInternships(req: Request, res: Response) {
    try {
      const internships = await this.internshipService.getAllInternships();
      res.status(200).json(internships);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getInternshipById(req: Request, res: Response) {
    try {
      const internshipId = Number(req.params.id);
      const internship = await this.internshipService.getInternshipById(internshipId);
      res.status(200).json(internship);
    } catch (error: any) {
      if (error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async getInternshipsByUser(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const internships = await this.internshipService.getInternshipsByUserId(userId);
      res.status(200).json(internships);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateInternship(req: Request, res: Response) {
    try {
      const internshipId = Number(req.params.id);
      const updatedInternship = await this.internshipService.updateInternship(
        internshipId,
        req.body
      );
      res.status(200).json(updatedInternship);
    } catch (error: any) {
      if (error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else if (error.message.includes('required') || error.message.includes('cannot be before')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async deleteInternship(req: Request, res: Response) {
    try {
      const internshipId = Number(req.params.id);
      await this.internshipService.deleteInternship(internshipId);
      res.status(204).send();
    } catch (error: any) {
      if (error.message.includes('not found')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}