// auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { AppDataSource } from '../database/data-source';
import { User } from '../entity/user';

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
    // Get the jwt token from the head
    const token = <string>req.headers['authorization']?.split(' ')[1];
    let jwtPayload;

    // Try to validate the token and get data
    try {
        jwtPayload = <any>jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-here');
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        // If token is not valid, respond with 401 (unauthorized)
        res.status(401).send({ message: 'Invalid or expired token' });
        return;
    }

    // The token is valid for 1 hour
    // We want to send a new token on every request
    const { userId, email } = jwtPayload;
    const newToken = jwt.sign({ userId, email }, process.env.JWT_SECRET || 'your-secret-key-here', {
        expiresIn: '1h'
    });
    res.setHeader('token', newToken);

    // Call the next middleware or controller
    next();
};

declare global {
    namespace Express {
      interface Request {
        user?: User;
      }
    }
  }
  
  // export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     // Get token from header
  //     const authHeader = req.headers.authorization;
  //     if (!authHeader?.startsWith('Bearer ')) {
  //       return res.status(401).json({ message: 'Authorization token required' });
  //     }
  
  //     const token = authHeader.split(' ')[1];
      
  //     // Verify token and decode payload
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'x5F$8kLp2@q9zW1!vT7mY3*6sDfGhJ4%') as { 
  //       userId: number; 
  //       email: string;
  //       role: string;
  //       iat: number;
  //       exp: number;
  //     };
  
  //     // Find user by string ID
  //     const userRepository = AppDataSource.getRepository(User);
  //     const user = await userRepository.findOne({ 
  //       where: { 
  //         id: decoded.userId // Direct string comparison
  //       }
  //     });
  
  //     if (!user) {
  //       return res.status(401).json({ message: 'User not found' });
  //     }
  
  //     // Attach user to request
  //     req.user = user;
  //     next();
  //   } catch (error) {
  //     console.error('Authentication error:', error);
  //     return res.status(401).json({ 
  //       message: 'Invalid or expired token',
  //       error: error instanceof Error ? error.message : 'Unknown error'
  //     });
  //   }
  // };

  export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get token from header
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token required' });
      }

      const token = authHeader.split(' ')[1];
      
      // Verify token and decode payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'x5F$8kLp2@q9zW1!vT7mY3*6sDfGhJ4%') as { 
        userId: number; 
        email: string;
        role: string;
        iat: number;
        exp: number;
      };

      // Find user by numeric ID
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ 
        where: { 
          id: decoded.userId
        }
      });

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Attach user to request
      req.user = user;
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(401).json({ 
        message: 'Invalid or expired token',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };