// import { AppDataSource } from "../database/data-source";
// import { Internship } from "../entity/internship";

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
// import { AppDataSource } from "../database/data-source";
// import { Internship } from "../entity/internship";
// import { User } from "../entity/user";
// import { InternshipDetails } from "../interfaces/internship.interface";

// export class InternshipRepository {
//   private repository = AppDataSource.getRepository(Internship);
//   private userRepository = AppDataSource.getRepository(User);

//   async create(internshipData: Internship): Promise<Internship> {
//     const user = await this.userRepository.findOneBy({ id: internshipData.id});
//     if (!user) {
//       throw new Error('User not found');
//     }

//     const internship:Internship = this.repository.create({
//       internship_title: internshipData.internship_title,
//       joined_date: internshipData.joined_date,
//       completion_date: internshipData.completion_date,
//       is_certified: internshipData.is_certified,
//       mentor_name: internshipData.mentor_name,
//       mentor_email: internshipData.mentor_email,
//       mentor_phone: internshipData.mentor_phone,
//       user: internshipData.user
//     });

//     return await this.repository.save(internship);
//   }

//   async findAll(): Promise<Internship[]> {
//     return await this.repository.find({ relations: ['user'] });
//   }

//   async findById(id: string): Promise<Internship | null> {
//     return await this.repository.findOne({ 
//       where: { id },
//       relations: ['user'] 
//     });
//   }

//   async findByUserId(userId: string): Promise<Internship[]> {
//     return await this.repository.find({ 
//       where: { user: { id: userId } },
//       relations: ['user'] 
//     });
//   }

//   async update(id: string, updates: Partial<InternshipDetails>): Promise<Internship | null> {
//     await this.repository.update(id, {
//       internship_title: updates.internshipTitle,
//       completion_date: updates.internshipCompletionDate,
//       is_certified: updates.isCertified,
//       mentor_name: updates.mentorName
//     });
//     return this.findById(id);
//   }

//   async delete(id: string): Promise<void> {
//     await this.repository.delete(id);
//   }
// }

//New Code 
import { AppDataSource } from "../database/data-source";
import { Internship } from "../entity/internship";
import { User } from "../entity/user";
import { Repository } from "typeorm";

export class InternshipRepository {
  private repository: Repository<Internship>;
  private userRepository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(Internship);
    this.userRepository = AppDataSource.getRepository(User);
  }

  // async create(internshipData: Internship): Promise<Internship> {
  //   // Validate user exists
  //   if (!internshipData.user?.id) {
  //     throw new Error('User reference is required');
  //   }

  //   const user = await this.userRepository.findOneBy({ 
  //     id: internshipData.user.id 
  //   });
    
  //   if (!user) {
  //     throw new Error(`User with ID ${internshipData.user.id} not found`);
  //   }

  //   const internship = this.repository.create({
  //     ...internshipData,
  //     user // Ensure proper relationship
  //   });

  //   return await this.repository.save(internship);
  // }

  //New code
  async create(internshipData: Internship): Promise<Internship> {
    // Extract user_id from the `user` relation
    // const userId = internshipData.user?.id;
    const userId = (internshipData as any).user_id || internshipData.user?.id;

    if (!userId) {
      throw new Error('User ID is required in internship.user');
    }
  
    // Validate user exists
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
  
    // Create new internship
    const internship = this.repository.create({
      internship_title: internshipData.internship_title,
      mentor_email: internshipData.mentor_email,
      mentor_phone: internshipData.mentor_phone,
      joined_date: internshipData.joined_date,
      completion_date: internshipData.completion_date,
      is_certified: internshipData.is_certified ?? false,
      mentor_name: internshipData.mentor_name,
      user
    });
  
    return await this.repository.save(internship);
  }
  

  async findAll(): Promise<Internship[]> {
    return await this.repository.find({ 
      relations: ['user']
    });
  }

  async findById(id: number): Promise<Internship | null> {
    return await this.repository.findOne({ 
      where: { id },
      relations: ['user'] 
    });
  }

  async findByUserId(userId: number): Promise<Internship[]> {
    if (!userId) throw new Error('User ID is required');
    
    return await this.repository.find({ 
      where: { user: { id: userId } },
      relations: ['user'] 
    });
  }

  async update(id: number, updates: Partial<Internship>): Promise<Internship | null> {
    // Handle user update if provided
    if (updates.user?.id) {
      const user = await this.userRepository.findOneBy({ id: updates.user.id });
      if (!user) throw new Error(`User with ID ${updates.user.id} not found`);
    }

    await this.repository.update(id, updates);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  // Optional: Cleanup method for orphaned internships
  async removeOrphanedInternships(): Promise<number> {
    const result = await this.repository
      .createQueryBuilder()
      .delete()
      .where("user_id IS NULL")
      .execute();
    
    return result.affected || 0;
  }
}

