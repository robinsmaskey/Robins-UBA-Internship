//New Code
import { Request, Response } from 'express';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRole } from '../entity/user'; // Import your UserRole enum

class AuthController {
    private static userRepository = new UserRepository();

    static register = async (req: Request, res: Response) => {
        const { firstName, lastName, email, password } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ 
                message: 'All fields are required',
                requiredFields: ['firstName', 'lastName', 'email', 'password']
            });
        }

        try {
            // Check if email exists
            const existingUser = await this.userRepository.findByEmail(email);
            if (existingUser) {
                return res.status(409).json({ 
                    message: 'Email already in use'
                });
            }

            // Create new user with default role (USER)
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = await this.userRepository.create({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.toLowerCase().trim(),
                password: hashedPassword,
                role: UserRole.USER // Default role
            });

            return res.status(201).json({ 
                message: 'User created successfully',
                user: {
                    id: newUser.id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    role: newUser.role // Include role in response
                }
            });

        } catch (error: unknown) {
            console.error('Registration error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Registration failed';
            return res.status(500).json({ 
                message: 'Internal server error during registration',
                error: errorMessage
            });
        }
    };

    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                message: 'Email and password are required'
            });
        }

        try {
            const user = await this.userRepository.findByEmailWithPassword(email);
            
            if (!user) {
                return res.status(401).json({ 
                    message: 'Invalid credentials'
                });
            }

            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(401).json({ 
                    message: 'Invalid credentials'
                });
            }

            // Include role in JWT payload
            const token = jwt.sign(
                { 
                    userId: user.id, 
                    email: user.email,
                    role: user.role // Added role to token
                },
                process.env.JWT_SECRET! || 'x5F$8kLp2@q9zW1!vT7mY3*6sDfGhJ4%',
                { expiresIn: '1h' }
            );

            // Remove password before sending response
            const { password: _, ...userWithoutPassword } = user;

            return res.json({
                token,
                user: userWithoutPassword
            });

        } catch (error: unknown) {
            console.error('Login error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            return res.status(500).json({ 
                message: 'Internal server error during login',
                error: errorMessage
            });
        }
    };

    // Optional: Admin-only endpoint to change user roles
    static changeRole = async (req: Request, res: Response) => {
        try {
            const { userId, newRole } = req.body;
            
            // Verify requesting user is admin
            if (req.user?.role !== UserRole.ADMIN) {
                return res.status(403).json({ message: 'Only admins can change roles' });
            }

            // Validate new role
            if (!Object.values(UserRole).includes(newRole)) {
                return res.status(400).json({ message: 'Invalid role' });
            }

            const updatedUser = await this.userRepository.update(userId, { role: newRole });
            
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.json({
                message: 'Role updated successfully',
                user: {
                    id: updatedUser.id,
                    email: updatedUser.email,
                    newRole: updatedUser.role
                }
            });

        } catch (error: unknown) {
            console.error('Role change error:', error);
            const errorMessage = error instanceof Error ? error.message : 'Role change failed';
            return res.status(500).json({ 
                message: 'Internal server error during role change',
                error: errorMessage
            });
        }
    };
}

export default AuthController;