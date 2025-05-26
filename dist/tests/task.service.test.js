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
const taskService = __importStar(require("../services/task.service"));
describe('Task Service', () => {
    // Access internal tasks array for testing
    const service = taskService;
    let mockTask;
    let fixedDate;
    beforeEach(() => {
        // Reset the tasks array and ID counter before each test
        service.tasks = [];
        fixedDate = new Date();
        // Create a fresh mock task for each test
        mockTask = {
            id: '1',
            title: 'Test Task',
            description: 'Test Description',
            price: 1000,
            completed: false,
            createdAt: fixedDate.toISOString(),
            updatedAt: fixedDate
        };
        // Mock Date constructor
        jest.useFakeTimers();
        jest.setSystemTime(fixedDate);
    });
    afterEach(() => {
        jest.useRealTimers();
    });
    describe('findAll', () => {
        it('should return an empty array when no tasks exist', async () => {
            const result = await taskService.findAll();
            expect(result).toEqual([]);
        });
        it('should return all tasks when they exist', async () => {
            // Create a fresh task directly in the service
            await taskService.create({
                title: mockTask.title,
                description: mockTask.description,
                price: mockTask.price,
                completed: mockTask.completed
            });
            const result = await taskService.findAll();
            expect(result[0]).toMatchObject({
                title: mockTask.title,
                description: mockTask.description,
                price: mockTask.price,
                completed: mockTask.completed
            });
        });
    });
    describe('findOne', () => {
        it('should return a task when it exists', async () => {
            // Create task through service
            const createdTask = await taskService.create({
                title: mockTask.title,
                description: mockTask.description,
                price: mockTask.price,
                completed: mockTask.completed
            });
            const result = await taskService.findOne(createdTask.id);
            expect(result).toMatchObject({
                title: mockTask.title,
                description: mockTask.description,
                price: mockTask.price,
                completed: mockTask.completed
            });
        });
        it('should return undefined when task does not exist', async () => {
            const result = await taskService.findOne('999');
            expect(result).toBeUndefined();
        });
    });
    describe('create', () => {
        it('should create and return a new task with required fields', async () => {
            const newTaskData = {
                title: 'New Task',
                description: 'New Description',
                price: 1500,
                completed: false
            };
            const result = await taskService.create(newTaskData);
            expect(result).toMatchObject({
                ...newTaskData,
                id: expect.any(String),
                createdAt: expect.any(String)
            });
        });
        it('should override completed status to false even when true is provided', async () => {
            const result = await taskService.create({
                title: 'Test',
                description: 'Test',
                price: 100,
                completed: true // Service will override this
            });
            expect(result.completed).toBe(false);
        });
        it('should generate sequential IDs', async () => {
            const task1 = await taskService.create({
                title: 'First Task',
                description: 'First Description',
                price: 1000,
                completed: false
            });
            const task2 = await taskService.create({
                title: 'Second Task',
                description: 'Second Description',
                price: 2000,
                completed: false
            });
        });
    });
    describe('update', () => {
        it('should update and return the modified task', async () => {
            const createdTask = await taskService.create({
                title: 'Original Task',
                description: 'Original Description',
                price: 1000,
                completed: false
            });
            const updates = {
                title: 'Updated Task',
                completed: true,
                price: 2000
            };
            const result = await taskService.update(createdTask.id, updates);
            expect(result).toMatchObject({
                ...updates,
                id: createdTask.id
            });
        });
        it('should return null when task does not exist', async () => {
            const result = await taskService.update('999', { title: 'Updated' });
            expect(result).toBeNull();
        });
    });
    describe('remove', () => {
        it('should remove and return the deleted task', async () => {
            const createdTask = await taskService.create({
                title: 'Task to delete',
                description: 'Delete me',
                price: 1000,
                completed: false
            });
            const result = await taskService.remove(createdTask.id);
            expect(result).toMatchObject({
                title: 'Task to delete',
                description: 'Delete me',
                price: 1000,
                completed: false
            });
            expect(service.tasks).toEqual([]);
        });
        it('should return null when task does not exist', async () => {
            const result = await taskService.remove('999');
            expect(result).toBeNull();
        });
    });
});
