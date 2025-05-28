// src/scripts/seed-admin.ts
import { AppDataSource } from '../database/data-source';
import { User } from '../entity/user';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '../entity/user'; // Import UserRole

async function seedAdmin() {
  try {
    // Initialize database connection
    await AppDataSource.initialize();
    console.log('Database connected');

    const userRepository = AppDataSource.getRepository(User);
    
    // Check if admin already exists
    const adminExists = await userRepository.findOneBy({ 
      email: 'admin@example.com' 
    });
    
    if (adminExists) {
      console.log('Admin user already exists');
      await AppDataSource.destroy();
      return;
    }

    // Create admin user
    const admin = new User();
    admin.firstName = 'Admin';
    admin.lastName = 'User';
    admin.email = 'admin@example.com';
    admin.password = await bcrypt.hash('admin123', 10);
    admin.role = UserRole.ADMIN; // Use the enum here
    
    await userRepository.save(admin);
    console.log('Admin user created successfully');

  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    // Close connection
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    process.exit(0);
  }
}

seedAdmin();