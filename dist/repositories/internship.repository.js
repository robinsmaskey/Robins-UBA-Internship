"use strict";
// import { AppDataSource } from "../database/data-source";
// import { Internship } from "../entity/internship";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternshipRepository = void 0;
// export class InternshipRepository {
//   private repository = AppDataSource.getRepository(Internship);
//   async create(userData: Partial<Internship>): Promise<Internship> {
//     const user = this.repository.create(userData);
//     return await this.repository.save(user);
//   }
//   async findAll(): Promise<Internship[]> {
//     return await this.repository.find();
//   }
//   async findById(id: string): Promise<Internship | null> {
//     return await this.repository.findOneBy({ id });
//   }
//   async update(id: string, updates: Partial<Internship>): Promise<Internship | null> {
//     await this.repository.update(id, updates);
//     return this.findById(id);
//   }
//   async delete(id: number): Promise<void> {
//     await this.repository.delete(id);
//   }
// }
//New Code
const data_source_1 = require("../database/data-source");
const internship_1 = require("../entity/internship");
const user_1 = require("../entity/user");
class InternshipRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(internship_1.Internship);
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
    async create(internshipData) {
        const user = await this.userRepository.findOneBy({ id: internshipData.id });
        if (!user) {
            throw new Error('User not found');
        }
        const internship = this.repository.create({
            internship_title: internshipData.internship_title,
            joined_date: internshipData.joined_date,
            completion_date: internshipData.completion_date,
            is_certified: internshipData.is_certified,
            mentor_name: internshipData.mentor_name,
            user: user
        });
        return await this.repository.save(internship);
    }
    async findAll() {
        return await this.repository.find({ relations: ['user'] });
    }
    async findById(id) {
        return await this.repository.findOne({
            where: { id },
            relations: ['user']
        });
    }
    async findByUserId(userId) {
        return await this.repository.find({
            where: { user: { id: userId } },
            relations: ['user']
        });
    }
    async update(id, updates) {
        await this.repository.update(id, {
            internship_title: updates.internshipTitle,
            completion_date: updates.internshipCompletionDate,
            is_certified: updates.isCertified,
            mentor_name: updates.mentorName
        });
        return this.findById(id);
    }
    async delete(id) {
        await this.repository.delete(id);
    }
}
exports.InternshipRepository = InternshipRepository;
