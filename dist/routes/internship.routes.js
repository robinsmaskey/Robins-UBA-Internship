"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const internship_controller_1 = require("../controllers/internship.controller");
const internship_service_1 = require("../services/internship.service");
const internship_repository_1 = require("../repositories/internship.repository");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const internship_validation_1 = require("../validations/internship.validation");
const router = (0, express_1.Router)();
// Initialize dependencies
const internshipRepository = new internship_repository_1.InternshipRepository();
const internshipService = new internship_service_1.InternshipService(internshipRepository);
const internshipController = new internship_controller_1.InternshipController(internshipService);
// Get all internships
router.get('/', internshipController.getAllInternships.bind(internshipController));
// Create new internship
router.post('/', (0, validation_middleware_1.validate)(internship_validation_1.internshipValidation.createInternship), internshipController.createInternship.bind(internshipController));
// Get internships by user ID
router.get('/user/:user_id', (0, validation_middleware_1.validate)(internship_validation_1.internshipValidation.userIdParam, { source: 'params' }), internshipController.getInternshipsByUser.bind(internshipController));
// Get single internship by ID
router.get('/:id', (0, validation_middleware_1.validate)(internship_validation_1.internshipValidation.idParam, { source: 'params' }), internshipController.getInternshipById.bind(internshipController));
// Update internship
router.patch('/:id', (0, validation_middleware_1.validate)(internship_validation_1.internshipValidation.idParam, { source: 'params' }), (0, validation_middleware_1.validate)(internship_validation_1.internshipValidation.updateInternship), internshipController.updateInternship.bind(internshipController));
// Delete internship
router.delete('/:id', (0, validation_middleware_1.validate)(internship_validation_1.internshipValidation.idParam, { source: 'params' }), internshipController.deleteInternship.bind(internshipController));
exports.default = router;
