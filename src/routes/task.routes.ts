import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { validate } from '../middlewares/validation.middleware';
import { createTaskSchema, updateTaskSchema } from '../validations/task.validation';

const router = Router();

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTask);
router.post('/', validate(createTaskSchema), taskController.createTask);
router.put('/:id', validate(updateTaskSchema), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;