"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createTaskSchema = joi_1.default.object({
    title: joi_1.default.string().required().min(3).max(100),
    description: joi_1.default.string().required().min(10).max(500),
    price: joi_1.default.number().required().min(1).max(50000000),
});
exports.updateTaskSchema = joi_1.default.object({
    title: joi_1.default.string().min(3).max(100),
    description: joi_1.default.string().min(10).max(500),
    price: joi_1.default.number().required().min(1).max(50000000),
    completed: joi_1.default.boolean(),
}).min(1); // at least one field is required for update
