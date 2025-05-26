import { Request, Response } from 'express';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

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

            // Create new user
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = await this.userRepository.create({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.toLowerCase().trim(),
                password: hashedPassword
            });

            return res.status(201).json({ 
                message: 'User created successfully',
                user: {
                    id: newUser.id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email
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

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET || 'your-secret-key-here',
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
}

export default AuthController;