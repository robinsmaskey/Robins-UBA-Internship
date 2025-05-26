"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController = __importStar(require("../controllers/task.controller"));
const validation_middleware_1 = require("../middlewares/validation.middleware");
const task_validation_1 = require("../validations/task.validation");
const router = (0, express_1.Router)();
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTask);
router.post('/', (0, validation_middleware_1.validate)(task_validation_1.createTaskSchema), taskController.createTask);
router.put('/:id', (0, validation_middleware_1.validate)(task_validation_1.updateTaskSchema), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
exports.default = router;
