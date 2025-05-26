"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.internshipValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// Helper for date validation
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
exports.internshipValidation = {
    createInternship: joi_1.default.object({
        user_id: joi_1.default.string().required().messages({
            'any.required': 'User ID is required',
            'string.empty': 'User ID cannot be empty'
        }),
        internship_title: joi_1.default.string().required().max(100).messages({
            'any.required': 'Internship title is required',
            'string.empty': 'Internship title cannot be empty',
            'string.max': 'Internship title cannot exceed 100 characters'
        }),
        mentor_name: joi_1.default.string().required().max(50).messages({
            'any.required': 'Mentor name is required',
            'string.empty': 'Mentor name cannot be empty',
            'string.max': 'Mentor name cannot exceed 50 characters'
        }),
        mentor_email: joi_1.default.string().email().required().messages({
            'any.required': 'Mentor email is required',
            'string.email': 'Mentor email must be a valid email',
            'string.empty': 'Mentor email cannot be empty'
        }),
        mentor_phone: joi_1.default.string().required().pattern(/^\+?[0-9]{10,15}$/).messages({
            'any.required': 'Mentor phone is required',
            'string.pattern.base': 'Phone number must be between 10-15 digits',
            'string.empty': 'Mentor phone cannot be empty'
        }),
        joined_date: joi_1.default.string().pattern(dateRegex).required().messages({
            'any.required': 'Joined date is required',
            'string.pattern.base': 'Joined date must be in YYYY-MM-DD format'
        }),
        completion_date: joi_1.default.string().pattern(dateRegex).optional().allow(null).messages({
            'string.pattern.base': 'Completion date must be in YYYY-MM-DD format'
        }),
        is_certified: joi_1.default.boolean().default(false)
    }).options({ abortEarly: false }),
    updateInternship: joi_1.default.object({
        internship_title: joi_1.default.string().max(100).optional().messages({
            'string.max': 'Internship title cannot exceed 100 characters'
        }),
        mentor_name: joi_1.default.string().max(50).optional().messages({
            'string.max': 'Mentor name cannot exceed 50 characters'
        }),
        mentor_email: joi_1.default.string().email().optional().messages({
            'string.email': 'Mentor email must be a valid email'
        }),
        mentor_phone: joi_1.default.string().pattern(/^\+?[0-9]{10,15}$/).optional().messages({
            'string.pattern.base': 'Phone number must be between 10-15 digits'
        }),
        joined_date: joi_1.default.string().pattern(dateRegex).optional().messages({
            'string.pattern.base': 'Joined date must be in YYYY-MM-DD format'
        }),
        completion_date: joi_1.default.string().pattern(dateRegex).optional().allow(null).messages({
            'string.pattern.base': 'Completion date must be in YYYY-MM-DD format'
        }),
        is_certified: joi_1.default.boolean().optional()
    }).options({ abortEarly: false }),
    idParam: joi_1.default.object({
        id: joi_1.default.string().required().messages({
            'any.required': 'Internship ID is required',
            'string.empty': 'Internship ID cannot be empty'
        })
    }),
    userIdParam: joi_1.default.object({
        user_id: joi_1.default.string().required().messages({
            'any.required': 'User ID is required',
            'string.empty': 'User ID cannot be empty'
        })
    })
};
