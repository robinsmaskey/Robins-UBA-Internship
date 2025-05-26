"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const task_service_1 = require("../services/task.service");
exports.resolvers = {
    Query: {
        tasks: async (_, { limit, offset }) => {
            const allTasks = await (0, task_service_1.findAll)();
            // Apply pagination if parameters are provided
            let result = [...allTasks];
            if (offset)
                result = result.slice(offset);
            if (limit)
                result = result.slice(0, limit);
            return result;
        },
        task: async (_, { id }) => {
            const task = await (0, task_service_1.findOne)(id);
            return task || null;
        }
    },
    Mutation: {
        createTask: async (_, { input }) => {
            return await (0, task_service_1.create)({
                title: input.title,
                description: input.description,
                price: input.price,
                completed: input.completed || false
            });
        },
        updateTask: async (_, { id, input }) => {
            const updateData = {};
            if (input.title)
                updateData.title = input.title;
            if (input.description)
                updateData.description = input.description;
            if (input.price)
                updateData.price = input.price;
            if (input.completed !== undefined)
                updateData.completed = input.completed;
            return await (0, task_service_1.update)(id, updateData);
        },
        deleteTask: async (_, { id }) => {
            const result = await (0, task_service_1.remove)(id);
            return result !== null;
        },
        toggleTask: async (_, { id }) => {
            const task = await (0, task_service_1.findOne)(id);
            if (!task)
                return null;
            return await (0, task_service_1.update)(id, {
                completed: !task.completed
            });
        }
    }
};
