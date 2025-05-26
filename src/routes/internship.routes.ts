import { Router } from 'express';
import { InternshipController } from '../controllers/internship.controller';
import { InternshipService } from '../services/internship.service';
import { InternshipRepository } from '../repositories/internship.repository';
import { AppDataSource } from '../database/data-source';
import { validate } from '../middlewares/validation.middleware';
import { internshipValidation } from '../validations/internship.validation';

const router = Router();

// Initialize dependencies
const internshipRepository = new InternshipRepository();
const internshipService = new InternshipService(internshipRepository);
const internshipController = new InternshipController(internshipService);

// Get all internships
router.get(
  '/',
  internshipController.getAllInternships.bind(internshipController)
);

// Create new internship
router.post(
  '/',
  validate(internshipValidation.createInternship),
  internshipController.createInternship.bind(internshipController)
);

// Get internships by user ID
router.get(
  '/user/:user_id',
  validate(internshipValidation.userIdParam, { source: 'params' }),
  internshipController.getInternshipsByUser.bind(internshipController)
);

// Get single internship by ID
router.get(
  '/:id',
  validate(internshipValidation.idParam, { source: 'params' }),
  internshipController.getInternshipById.bind(internshipController)
);

// Update internship
router.patch(
  '/:id',
  validate(internshipValidation.idParam, { source: 'params' }),
  validate(internshipValidation.updateInternship),
  internshipController.updateInternship.bind(internshipController)
);

// Delete internship
router.delete(
  '/:id',
  validate(internshipValidation.idParam, { source: 'params' }),
  internshipController.deleteInternship.bind(internshipController)
);

export default router;