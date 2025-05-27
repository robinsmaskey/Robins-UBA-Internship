import { DataSource } from 'typeorm';
import { User } from '../entity/user';
import { Internship } from '../entity/internship'; 
import * as dotenv from 'dotenv';
import "reflect-metadata";

// Load environment variables from .env file
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST ,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME ,
  synchronize: true, // set to false in production
  logging: process.env.NODE_ENV === 'development',
  entities: [User, Internship],
  migrations: [],
  subscribers: [],
});

export class Database {
  static async ensureConnection() {
      if (!AppDataSource.isInitialized) {
          try {
              await AppDataSource.initialize();
              console.log('Database connected successfully');
          } catch (error) {
              console.error('Database connection error:', error);
              throw error;
          }
      }
      return AppDataSource;
  }
}