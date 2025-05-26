import Joi from 'joi';
import { UserDetails } from '../interfaces/user.interface';

// Custom date validator that accepts multiple formats
const validateDate = (value: any, helpers: Joi.CustomHelpers) => {
  const date = new Date(value);
  return isNaN(date.getTime()) ? helpers.error('date.invalid') : date;
};

// Custom validator for completion date after join date
const validateDateAfter = (ref: string) => (value: any, helpers: Joi.CustomHelpers) => {
  const compareDate = new Date(value);
  const referenceDate = new Date(helpers.state.ancestors[0][ref]);
  
  if (compareDate <= referenceDate) {
    return helpers.error('date.min', { comparisonDate: referenceDate.toISOString() });
  }
  return value;
};

export const userValidation = {
  createUser: Joi.object<UserDetails>({
    firstName: Joi.string().min(2).max(50).required()
      .messages({
        'string.empty': 'First name is required',
        'string.min': 'First name must be at least 2 characters',
        'string.max': 'First name cannot exceed 50 characters'
      }),
    
    lastName: Joi.string().min(2).max(50).required()
      .messages({
        'string.empty': 'Last name is required',
        'string.min': 'Last name must be at least 2 characters',
        'string.max': 'Last name cannot exceed 50 characters'
      }),
    
    email: Joi.string().email().required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'string.empty': 'Email is required'
      }),
    
    internshipJoinedDate: Joi.alternatives()
      .try(
        Joi.date().iso(),
        Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
        Joi.string().pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/) // Full ISO
      )
      .custom(validateDate)
      .required()
      .messages({
        'alternatives.match': 'Join date must be in ISO format (YYYY-MM-DD or full ISO)',
        'any.required': 'Join date is required',
        'date.base': 'Invalid join date format'
      }),
    
    internshipCompletionDate: Joi.alternatives()
      .try(
        Joi.date().iso(),
        Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
        Joi.string().pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/) // Full ISO
      )
      .custom(validateDate)
      .required()
      .custom(validateDateAfter('internshipJoinedDate'))
      .messages({
        'alternatives.match': 'Completion date must be in ISO format (YYYY-MM-DD or full ISO)',
        'any.required': 'Completion date is required',
        'date.base': 'Invalid completion date format',
        'date.min': 'Completion date must be after join date'
      }),
    
    isCertified: Joi.boolean().default(false),
    
    mentorName: Joi.string().min(2).max(100).required()
      .messages({
        'string.empty': 'Mentor name is required',
        'string.min': 'Mentor name must be at least 2 characters',
        'string.max': 'Mentor name cannot exceed 100 characters'
      }),
    
    mentorEmail: Joi.string().email().optional()
      .messages({
        'string.email': 'Please provide a valid mentor email address'
      }),
    
    mentorPhone: Joi.string()
      .pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/)
      .optional()
      .messages({
        'string.pattern.base': 'Please provide a valid phone number'
      })
  }).options({ abortEarly: false }),

  updateUser: Joi.object<Partial<UserDetails>>({
    firstName: Joi.string().min(2).max(50),
    lastName: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    internshipJoinedDate: Joi.alternatives().try(Joi.date(), Joi.string().isoDate()),
    internshipCompletionDate: Joi.alternatives()
      .try(Joi.date(), Joi.string().isoDate())
      .when('internshipJoinedDate', {
        is: Joi.exist(),
        then: Joi.custom(validateDateAfter('internshipJoinedDate')),
        otherwise: Joi.alternatives().try(Joi.date(), Joi.string().isoDate())
      }),
    isCertified: Joi.boolean(),
    mentorName: Joi.string().min(2).max(100),
    mentorEmail: Joi.string().email(),
    mentorPhone: Joi.string().pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/),
    id: Joi.forbidden(),
    createdAt: Joi.forbidden(),
    updatedAt: Joi.forbidden()
  }).options({ abortEarly: false }),

  userIdParam: Joi.object({
    id: Joi.string().required()
      .messages({
        'string.empty': 'User ID is required'
      })
  }),

  certificationQuery: Joi.object({
    certified: Joi.boolean().required()
      .messages({
        'boolean.base': 'Certified must be true or false'
      })
  })
};

// Manual type definitions
export type CreateUserInput = Omit<UserDetails, 'id' | 'createdAt' | 'updatedAt'> & {
  internshipJoinedDate: Date | string;
  internshipCompletionDate: Date | string;
};

export type UpdateUserInput = Partial<CreateUserInput>;