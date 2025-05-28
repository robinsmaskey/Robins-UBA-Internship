// import { AppDataSource } from "../database/data-source";
// import { User } from "../entity/user";

// export class UserRepository {
//   private repository = AppDataSource.getRepository(User);

//   async create(userData: Partial<User>): Promise<User> {
//     const user = this.repository.create(userData);
//     return await this.repository.save(user);
//   }

//   async findAll(): Promise<User[]> {
//     return await this.repository.find();
//   }

//   async findById(id: string): Promise<User | null> {
//     return await this.repository.findOneBy({ id });
//   }

//   async update(id: string, updates: Partial<User>): Promise<User | null> {
//     await this.repository.update(id, updates);
//     return this.findById(id);
//   }

//   async delete(id: number): Promise<void> {
//     await this.repository.delete(id);
//   }
// }

//New Code
import { AppDataSource } from "../database/data-source";
import { User } from "../entity/user";
import { Repository } from "typeorm";

export class UserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async create(userData: Partial<User>): Promise<User> {
        const user = this.repository.create(userData);
        return await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOneBy({ email });
    }

    async findByEmailWithPassword(email: string): Promise<User | null> {
        return await this.repository
            .createQueryBuilder('user')
            .where('user.email = :email', { email })
            .addSelect('user.password')
            .getOne();
    }

    async findAll(): Promise<User[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<User | null> {
        return await this.repository.findOneBy({ id });
    }

    async update(id: number, updates: Partial<User>): Promise<User | null> {
        await this.repository.update(id, updates);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}