"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// Custom date validator that accepts multiple formats
const validateDate = (value, helpers) => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? helpers.error('date.invalid') : date;
};
// Custom validator for completion date after join date
const validateDateAfter = (ref) => (value, helpers) => {
    const compareDate = new Date(value);
    const referenceDate = new Date(helpers.state.ancestors[0][ref]);
    if (compareDate <= referenceDate) {
        return helpers.error('date.min', { comparisonDate: referenceDate.toISOString() });
    }
    return value;
};
exports.userValidation = {
    createUser: joi_1.default.object({
        firstName: joi_1.default.string().min(2).max(50).required()
            .messages({
            'string.empty': 'First name is required',
            'string.min': 'First name must be at least 2 characters',
            'string.max': 'First name cannot exceed 50 characters'
        }),
        lastName: joi_1.default.string().min(2).max(50).required()
            .messages({
            'string.empty': 'Last name is required',
            'string.min': 'Last name must be at least 2 characters',
            'string.max': 'Last name cannot exceed 50 characters'
        }),
        email: joi_1.default.string().email().required()
            .messages({
            'string.email': 'Please provide a valid email address',
            'string.empty': 'Email is required'
        }),
        internshipJoinedDate: joi_1.default.alternatives()
            .try(joi_1.default.date().iso(), joi_1.default.string().pattern(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
        joi_1.default.string().pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/) // Full ISO
        )
            .custom(validateDate)
            .required()
            .messages({
            'alternatives.match': 'Join date must be in ISO format (YYYY-MM-DD or full ISO)',
            'any.required': 'Join date is required',
            'date.base': 'Invalid join date format'
        }),
        internshipCompletionDate: joi_1.default.alternatives()
            .try(joi_1.default.date().iso(), joi_1.default.string().pattern(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
        joi_1.default.string().pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/) // Full ISO
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
        isCertified: joi_1.default.boolean().default(false),
        mentorName: joi_1.default.string().min(2).max(100).required()
            .messages({
            'string.empty': 'Mentor name is required',
            'string.min': 'Mentor name must be at least 2 characters',
            'string.max': 'Mentor name cannot exceed 100 characters'
        }),
        mentorEmail: joi_1.default.string().email().optional()
            .messages({
            'string.email': 'Please provide a valid mentor email address'
        }),
        mentorPhone: joi_1.default.string()
            .pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/)
            .optional()
            .messages({
            'string.pattern.base': 'Please provide a valid phone number'
        })
    }).options({ abortEarly: false }),
    updateUser: joi_1.default.object({
        firstName: joi_1.default.string().min(2).max(50),
        lastName: joi_1.default.string().min(2).max(50),
        email: joi_1.default.string().email(),
        internshipJoinedDate: joi_1.default.alternatives().try(joi_1.default.date(), joi_1.default.string().isoDate()),
        internshipCompletionDate: joi_1.default.alternatives()
            .try(joi_1.default.date(), joi_1.default.string().isoDate())
            .when('internshipJoinedDate', {
            is: joi_1.default.exist(),
            then: joi_1.default.custom(validateDateAfter('internshipJoinedDate')),
            otherwise: joi_1.default.alternatives().try(joi_1.default.date(), joi_1.default.string().isoDate())
        }),
        isCertified: joi_1.default.boolean(),
        mentorName: joi_1.default.string().min(2).max(100),
        mentorEmail: joi_1.default.string().email(),
        mentorPhone: joi_1.default.string().pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/),
        id: joi_1.default.forbidden(),
        createdAt: joi_1.default.forbidden(),
        updatedAt: joi_1.default.forbidden()
    }).options({ abortEarly: false }),
    userIdParam: joi_1.default.object({
        id: joi_1.default.string().required()
            .messages({
            'string.empty': 'User ID is required'
        })
    }),
    certificationQuery: joi_1.default.object({
        certified: joi_1.default.boolean().required()
            .messages({
            'boolean.base': 'Certified must be true or false'
        })
    })
};
