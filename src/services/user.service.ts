//New Code 4
import { AppDataSource } from '../database/data-source';
import { User } from '../entity/user';
import { UserDetails } from '../interfaces/user.interface';
import { UserRole } from '../entity/user';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  /**
   * Create a new user
   */
  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    this.validateUserData(userData);

    if (await this.doesUserExist(userData.email)) {
      throw new Error('User with this email already exists');
    }

    const newUser = this.userRepository.create({
      ...userData,
      role: userData.role || UserRole.USER // Default to USER role if not specified
    });

    return await this.userRepository.save(newUser);
  }

  /**
   * Get all users (with optional currentUser for filtering)
   */
  async getAllUsers(currentUser?: User): Promise<User[]> {
    if (currentUser?.role !== UserRole.ADMIN) {
      // Non-admins only get their own user record
      return this.userRepository.find({ 
        where: { id: currentUser?.id },
        select: ['id', 'firstName', 'lastName', 'email', 'role'] // Exclude sensitive fields
      });
    }
    // Admins get all users (excluding passwords)
    return this.userRepository.find({
      select: ['id', 'firstName', 'lastName', 'email', 'role']
    });
  }

  /**
   * Get user by ID (with optional currentUser for authorization)
   */
  async getUserById(id: number, currentUser?: User): Promise<User> {
    // If no current user provided, only allow if the system needs to fetch without auth
    if (currentUser) {
        // Admins can access any profile
        if (currentUser.role !== UserRole.ADMIN) {
            // Regular users can only access their own profile
            if (currentUser.id !== id) {
                throw new Error('Unauthorized access');
            }
        }
    }

    const user = await this.userRepository.findOne({ 
        where: { id },
        select: ['id', 'firstName', 'lastName', 'email', 'role'] // Exclude sensitive fields
    });

    if (!user) {
        throw new Error('User not found');
    }
    return user;
}


  async updateUser(id: number, updates: Partial<User>, currentUser?: User): Promise<Partial<User>> {
    // Verify user exists first
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
        throw new Error('User not found');
    }

    // Authorization check
    if (currentUser?.role !== UserRole.ADMIN && currentUser?.id !== id) {
        throw new Error('Unauthorized access');
    }

    // Role modification check
    if (updates.role && currentUser?.role !== UserRole.ADMIN) {
        throw new Error('Only admins can modify roles');
    }

    // Prevent ID modification
    if (updates.id) {
        throw new Error('Cannot modify ID');
    }

    // Prevent password updates (should use dedicated endpoint)
    if (updates.password) {
        throw new Error('Use dedicated password change endpoint');
    }

    // Apply updates
    this.userRepository.merge(user, updates);
    const updatedUser = await this.userRepository.save(user);
    
    // Return user without password
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
}

  async deleteUser(id: number, currentUser: User): Promise<void> {
    // Verify user exists first to prevent unnecessary checks
    const userExists = await this.userRepository.existsBy({ id });
    if (!userExists) {
        throw new Error('User not found');
    }

    // Single source of truth for authorization
    if (currentUser.role !== UserRole.ADMIN) {
        throw new Error('Only admins can delete users');
    }

    if (currentUser.id === id) {
        throw new Error('Cannot delete your own account');
    }

    // Perform deletion
    const result = await this.userRepository.delete(id);
    
    // Double-check deletion was successful
    if (result.affected === 0) {
        throw new Error('Deletion failed - user may have been already deleted');
    }
}

  // Private validation methods (unchanged)
  private validateUserData(userData: Partial<UserDetails>): void {
    if (!userData.firstName || !userData.lastName || !userData.email) {
      throw new Error('First name, last name, and email are required');
    }
  }

  private async doesUserExist(email: string): Promise<boolean> {
    const count = await this.userRepository.countBy({ email });
    return count > 0;
  }
  
}