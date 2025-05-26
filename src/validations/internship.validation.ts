import Joi from 'joi';
import { Internship } from '../entity/internship';

// Helper for date validation
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const internshipValidation = {
  createInternship: Joi.object({
    user_id: Joi.string().required().messages({
      'any.required': 'User ID is required',
      'string.empty': 'User ID cannot be empty'
    }),
    internship_title: Joi.string().required().max(100).messages({
      'any.required': 'Internship title is required',
      'string.empty': 'Internship title cannot be empty',
      'string.max': 'Internship title cannot exceed 100 characters'
    }),
    mentor_name: Joi.string().required().max(50).messages({
      'any.required': 'Mentor name is required',
      'string.empty': 'Mentor name cannot be empty',
      'string.max': 'Mentor name cannot exceed 50 characters'
    }),
    mentor_email: Joi.string().email().required().messages({
      'any.required': 'Mentor email is required',
      'string.email': 'Mentor email must be a valid email',
      'string.empty': 'Mentor email cannot be empty'
    }),
    mentor_phone: Joi.string().required().pattern(/^\+?[0-9]{10,15}$/).messages({
      'any.required': 'Mentor phone is required',
      'string.pattern.base': 'Phone number must be between 10-15 digits',
      'string.empty': 'Mentor phone cannot be empty'
    }),
    joined_date: Joi.string().pattern(dateRegex).required().messages({
      'any.required': 'Joined date is required',
      'string.pattern.base': 'Joined date must be in YYYY-MM-DD format'
    }),
    completion_date: Joi.string().pattern(dateRegex).optional().allow(null).messages({
      'string.pattern.base': 'Completion date must be in YYYY-MM-DD format'
    }),
    is_certified: Joi.boolean().default(false)
  }).options({ abortEarly: false }), // Show all validation errors at once

  updateInternship: Joi.object({
    internship_title: Joi.string().max(100).optional().messages({
      'string.max': 'Internship title cannot exceed 100 characters'
    }),
    mentor_name: Joi.string().max(50).optional().messages({
      'string.max': 'Mentor name cannot exceed 50 characters'
    }),
    mentor_email: Joi.string().email().optional().messages({
      'string.email': 'Mentor email must be a valid email'
    }),
    mentor_phone: Joi.string().pattern(/^\+?[0-9]{10,15}$/).optional().messages({
      'string.pattern.base': 'Phone number must be between 10-15 digits'
    }),
    joined_date: Joi.string().pattern(dateRegex).optional().messages({
      'string.pattern.base': 'Joined date must be in YYYY-MM-DD format'
    }),
    completion_date: Joi.string().pattern(dateRegex).optional().allow(null).messages({
      'string.pattern.base': 'Completion date must be in YYYY-MM-DD format'
    }),
    is_certified: Joi.boolean().optional()
  }).options({ abortEarly: false }),

  idParam: Joi.object({
    id: Joi.string().required().messages({
      'any.required': 'Internship ID is required',
      'string.empty': 'Internship ID cannot be empty'
    })
  }),

  userIdParam: Joi.object({
    user_id: Joi.string().required().messages({
      'any.required': 'User ID is required',
      'string.empty': 'User ID cannot be empty'
    })
  })
};