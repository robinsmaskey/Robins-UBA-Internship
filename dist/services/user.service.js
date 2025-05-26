"use strict";
// import { UserDetails } from '../interfaces/user.interface';
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
// // In-memory store (would be replaced with database operations in a real application)
// const users: Record<string, UserDetails> = {};
// export class UserService {
//   /**
//    * Create a new user
//    * @param userData User details
//    * @returns The created user
//    * @throws Error if validation fails or user already exists
//    */
//   async createUser(userData: Omit<UserDetails, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserDetails> {
//     this.validateUserData(userData);
//     if (this.doesUserExist(userData.email)) {
//       throw new Error('User with this email already exists');
//     }
//     const newUser: UserDetails = {
//       ...userData,
//       id: Date.now().toString(),
//       createdAt: new Date(),
//       isCertified: userData.isCertified || false,
//       internshipJoinedDate: new Date(userData.internshipJoinedDate),
//       internshipCompletionDate: new Date(userData.internshipCompletionDate)
//     };
//     users[newUser.id] = newUser;
//     return newUser;
//   }
//   /**
//    * Get all users
//    * @returns Array of all users
//    */
//   async getAllUsers(): Promise<UserDetails[]> {
//     return Object.values(users);
//   }
//   /**
//    * Get user by ID
//    * @param id User ID
//    * @returns The user object
//    * @throws Error if user not found
//    */
//   async getUserById(id: string): Promise<UserDetails> {
//     const user = users[id];
//     if (!user) {
//       throw new Error('User not found');
//     }
//     return user;
//   }
//   /**
//    * Update user details
//    * @param id User ID
//    * @param updates Fields to update
//    * @returns The updated user
//    * @throws Error if user not found or invalid updates
//    */
//   async updateUser(id: string, updates: Partial<UserDetails>): Promise<UserDetails> {
//     if (!users[id]) {
//       throw new Error('User not found');
//     }
//     if (updates.id || updates.createdAt) {
//       throw new Error('Cannot modify ID or creation date');
//     }
//     const updatedUser = {
//       ...users[id],
//       ...updates,
//       updatedAt: new Date()
//     };
//     // Handle date conversions
//     if (updates.internshipJoinedDate) {
//       updatedUser.internshipJoinedDate = new Date(updates.internshipJoinedDate);
//     }
//     if (updates.internshipCompletionDate) {
//       updatedUser.internshipCompletionDate = new Date(updates.internshipCompletionDate);
//     }
//     users[id] = updatedUser;
//     return updatedUser;
//   }
//   /**
//    * Delete a user
//    * @param id User ID
//    * @throws Error if user not found
//    */
//   async deleteUser(id: string): Promise<void> {
//     if (!users[id]) {
//       throw new Error('User not found');
//     }
//     delete users[id];
//   }
//   /**
//    * Get users by certification status
//    * @param certified Certification status to filter by
//    * @returns Array of users matching the certification status
//    */
//   async getUsersByCertification(certified: boolean): Promise<UserDetails[]> {
//     return Object.values(users).filter(user => user.isCertified === certified);
//   }
//   // Private helper methods
//   private validateUserData(userData: Partial<UserDetails>): void {
//     if (!userData.firstName || !userData.lastName || !userData.email) {
//       throw new Error('First name, last name, and email are required');
//     }
//   }
//   private doesUserExist(email: string): boolean {
//     return Object.values(users).some(user => user.email === email);
//   }
// }
//New Code
const data_source_1 = require("../database/data-source");
const user_1 = require("../entity/user");
class UserService {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
    /**
     * Create a new user
     */
    async createUser(userData) {
        this.validateUserData(userData);
        if (await this.doesUserExist(userData.email)) {
            throw new Error('User with this email already exists');
        }
        const newUser = this.userRepository.create({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
        });
        return await this.userRepository.save(newUser);
    }
    /**
     * Get all users
     */
    async getAllUsers() {
        const users = await this.userRepository.find();
        return users;
    }
    /**
     * Get user by ID
     */
    async getUserById(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    /**
     * Update user details
     */
    async updateUser(id, updates) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new Error('User not found');
        }
        if (updates.id) {
            throw new Error('Cannot modify ID or creation date');
        }
        // Apply updates
        this.userRepository.merge(user, {
            ...updates,
        });
        await this.userRepository.save(user);
        return user;
    }
    /**
     * Delete a user
     */
    async deleteUser(id) {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('User not found');
        }
    }
    /**
     * Get users by certification status
     */
    // Private validation methods
    validateUserData(userData) {
        if (!userData.firstName || !userData.lastName || !userData.email) {
            throw new Error('First name, last name, and email are required');
        }
    }
    async doesUserExist(email) {
        const count = await this.userRepository.countBy({ email });
        return count > 0;
    }
}
exports.UserService = UserService;
