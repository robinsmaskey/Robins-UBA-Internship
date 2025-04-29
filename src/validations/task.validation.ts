import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(10).max(500),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(10).max(500),
  completed: Joi.boolean(),
}).min(1); // at least one field is required for update