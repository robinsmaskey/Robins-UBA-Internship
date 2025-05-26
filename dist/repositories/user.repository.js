"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const data_source_1 = require("../database/data-source");
const user_1 = require("../entity/user");
class UserRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
    async create(userData) {
        const user = this.repository.create(userData);
        return await this.repository.save(user);
    }
    async findAll() {
        return await this.repository.find();
    }
    async findById(id) {
        return await this.repository.findOneBy({ id });
    }
    async update(id, updates) {
        await this.repository.update(id, updates);
        return this.findById(id);
    }
    async delete(id) {
        await this.repository.delete(id);
    }
}
exports.UserRepository = UserRepository;
