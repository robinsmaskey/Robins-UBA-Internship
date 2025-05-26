"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findOne = exports.findAll = void 0;
let tasks = [];
const findAll = async () => tasks;
exports.findAll = findAll;
const findOne = async (id) => {
    return tasks.find(task => task.id === id);
};
exports.findOne = findOne;
const create = async (newTask) => {
    const task = {
        id: (tasks.length + 1).toString(),
        ...newTask,
        completed: false,
        createdAt: new Date().toISOString() // Convert Date to ISO string
    };
    tasks.push(task);
    return task;
};
exports.create = create;
const update = async (id, taskUpdate) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1)
        return null;
    tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...taskUpdate
    };
    return tasks[taskIndex];
};
exports.update = update;
const remove = async (id) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1)
        return null;
    const deletedTask = tasks[taskIndex];
    tasks = tasks.filter(task => task.id !== id);
    return deletedTask;
};
exports.remove = remove;
