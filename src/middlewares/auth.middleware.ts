// auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
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