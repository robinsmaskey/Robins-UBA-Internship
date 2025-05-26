"use strict";
// import { Request, Response } from 'express';
// import { UserDetails } from '../interfaces/user.interface';
// import { UserService } from '../services/user.service';
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(req, res) {
        try {
            const userData = req.body;
            const user = await this.userService.createUser(userData);
            res.status(201).json(user);
        }
        catch (error) {
            if (error.message.includes('already exists')) {
                res.status(409).json({ error: error.message });
            }
            else if (error.message.includes('required')) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    async getAllUsers(req, res) {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getUserById(req, res) {
        try {
            const user = await this.userService.getUserById(req.params.id);
            res.status(200).json(user);
        }
        catch (error) {
            if (error.message.includes('not found')) {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    async updateUser(req, res) {
        try {
            const updatedUser = await this.userService.updateUser(req.params.id, req.body);
            res.status(200).json(updatedUser);
        }
        catch (error) {
            if (error.message.includes('not found')) {
                res.status(404).json({ error: error.message });
            }
            else if (error.message.includes('Cannot modify')) {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
    async deleteUser(req, res) {
        try {
            await this.userService.deleteUser(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            if (error.message.includes('not found')) {
                res.status(404).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
}
exports.UserController = UserController;
