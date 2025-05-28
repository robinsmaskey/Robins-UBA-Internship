// // import express from 'express';
// // import { ApolloServer } from '@apollo/server';
// // import { expressMiddleware } from '@apollo/server/express4';
// // import bodyParser from 'body-parser';
// // import cors from 'cors';
// // import { typeDefs } from './graphql/schema';
// // import { resolvers } from './graphql/resolvers';
// // import userRouter from './routes/task.routes';


// // const PORT = process.env.PORT || 3000;

// // export async function startServer(){
// //   const app = express();
// //   app.use(express.json());
// //   app.use("/api/tasks", userRouter);
// //   const server = new ApolloServer({
// //       typeDefs,
// //       resolvers,
// //     });
  
// //     await server.start();
  
// //     app.use(
// //       '/graphql',
// //       cors<cors.CorsRequest>(),
// //       bodyParser.json(),
// //       expressMiddleware(server)
// //     );
// //   app.listen(PORT, () => {
// //     console.log(`Server is running on http://localhost:${PORT}`);
// //   });

// // }
  
// // //New App.ts
// // import express from 'express';
// // import { ApolloServer } from '@apollo/server';
// // import { expressMiddleware } from '@apollo/server/express4';
// // import cors from 'cors';
// // import bodyParser from 'body-parser';
// // import { typeDefs } from './graphql/schema';
// // import { resolvers } from './graphql/resolvers';
// // import userRouter from './routes/user.routes';
// // import taskRouter from './routes/task.routes';
// // import { errorHandler } from './middlewares/error.middleware';
// // import { notFoundHandler } from './middlewares/not-found.middleware';
// // import { AppDataSource } from './database/data-source';
// // import 'reflect-metadata';

// // const PORT = process.env.PORT || 3000;

// // export async function startServer() {
// //   // Initialize TypeORM Data Source
// //   try {
// //     await AppDataSource.initialize();
// //     console.log('Database connected successfully');
// //   } catch (error) {
// //     console.error('Database connection error:', error);
// //     process.exit(1);
// //   }

// //   const app = express();

// //   // Apply common middlewares
// //   app.use(cors());
// //   app.use(bodyParser.json());
// //   app.use(express.json());
// //   app.use(express.urlencoded({ extended: true }));

// //   // REST API Routes
// //   app.use('/api/users', userRouter);
// //   app.use('/api/tasks', taskRouter);

// //   // Apollo GraphQL Server
// //   const server = new ApolloServer({
// //     typeDefs,
// //     resolvers,
// //   });

// //   await server.start();

// //   // GraphQL Endpoint
// //   app.use(
// //     '/graphql',
// //     cors<cors.CorsRequest>(),
// //     bodyParser.json(),
// //     expressMiddleware(server)
// //   );

// //   // Error Handling Middlewares
// //   app.use(notFoundHandler);
// //   app.use(errorHandler);

// //   app.listen(PORT, () => {
// //     console.log(`Server running on http://localhost:${PORT}`);
// //     console.log(`REST Users API: http://localhost:${PORT}/api/users`);
// //     console.log(`REST Tasks API: http://localhost:${PORT}/api/tasks`);
// //     console.log(`GraphQL API: http://localhost:${PORT}/graphql`);
// //   });
// // }

// //New Code 2 
// // import express from 'express';
// // import cors from 'cors';
// // import bodyParser from 'body-parser';
// // import 'reflect-metadata';
// // import { AppDataSource } from './database/data-source';
// // import { UserService } from './services/user.service';
// // import { UserController } from './controllers/user.controller';
// // import userRouter from './routes/user.routes';
// // import { errorHandler } from './middlewares/error.middleware';
// // import { notFoundHandler } from './middlewares/not-found.middleware';

// // const PORT = process.env.PORT || 3000;

// // export async function startServer() {
// //   // Initialize database connection
// //   try {
// //     await AppDataSource.initialize();
// //     console.log('Database connected successfully');
// //   } catch (error) {
// //     console.error('Database connection error:', error);
// //     process.exit(1);
// //   }

// //   const app = express();

// //   // Initialize services and controllers
// //   const userService = new UserService();
// //   const userController = new UserController(userService);

// //   // Middlewares
// //   app.use(cors());
// //   app.use(bodyParser.json());
// //   app.use(express.json());
// //   app.use(express.urlencoded({ extended: true }));

// //   // Routes
// //   app.use('/api/users', userRouter);
 

// //   // Error handling middlewares
// //   app.use(notFoundHandler);
// //   app.use(errorHandler);

// //   app.listen(PORT, () => {
// //     console.log(`Server running on http://localhost:${PORT}`);
// //     console.log(`Users API: http://localhost:${PORT}/api/users`);
// //     console.log(`Health check: http://localhost:${PORT}/api/health`);
// //   });
// // }

// //New Code 3
// // import express from 'express';
// // import cors from 'cors';
// // import bodyParser from 'body-parser';
// // import 'reflect-metadata';
// // import { AppDataSource } from './database/data-source';
// // import { UserService } from './services/user.service';
// // import { UserController } from './controllers/user.controller';
// // import { InternshipService } from './services/internship.service';
// // import { InternshipRepository } from './repositories/internship.repository';
// // import taskRouter from './routes/task.routes';
// // import userRouter from './routes/user.routes';
// // import internshipRouter from './routes/internship.routes'; // Make sure this import path is correct
// // import { errorHandler } from './middlewares/error.middleware';
// // import { notFoundHandler } from './middlewares/not-found.middleware';
// // import authRoutes from './routes/auth.routes';
// // import 'dotenv/config';

// // const PORT = process.env.PORT || 3000;

// // export async function startServer() {
// //   // Initialize database connection
// //   try {
// //     await AppDataSource.initialize();
// //     console.log('Database connected successfully');
// //   } catch (error) {
// //     console.error('Database connection error:', error);
// //     process.exit(1);
// //   }

// //   const app = express();

// //   // Initialize services and controllers
// //   const userService = new UserService();
// //   const userController = new UserController(userService);
  
// //   // Initialize internship dependencies
// //   const internshipRepository = new InternshipRepository();
// //   const internshipService = new InternshipService(internshipRepository);

// //   // Middlewares
// //   app.use(cors());
// //   app.use(bodyParser.json());
// //   app.use(express.json());
// //   app.use(express.urlencoded({ extended: true }));

// //   // Health check endpoint
// //   app.get('/api/health', (req, res) => {
// //     res.status(200).json({ status: 'OK' });
// //   });

// //   // Routes
// //   app.use('/api/users', userRouter);
// //   app.use('/api/tasks', taskRouter);
// //   app.use('/api/internships', internshipRouter);
// //   app.use('/auth', authRoutes);

// //   // Error handling middlewares
// //   app.use(notFoundHandler);
// //   app.use(errorHandler);

// //   app.listen(PORT, () => {
// //     console.log(`Server running on http://localhost:${PORT}`);
// //     console.log(`Tasks API: http://localhost:${PORT}/api/tasks`)
// //     console.log(`Users API: http://localhost:${PORT}/api/users`);
// //     console.log(`Internships API: http://localhost:${PORT}/api/internships`);
// //     console.log(`Login API: http://localhost:${PORT}/auth`);
// //     console.log(`Health check: http://localhost:${PORT}/api/health`);
// //   });
// // }

// // // Start the server if this file is run directly
// // if (require.main === module) {
// //   startServer().catch(error => {
// //     console.error('Failed to start server:', error);
// //     process.exit(1);
// //   });
// // }

// //New Code 4
// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import 'reflect-metadata';
// import { AppDataSource } from './database/data-source';
// import { UserService } from './services/user.service';
// import { UserController } from './controllers/user.controller';
// import { InternshipService } from './services/internship.service';
// import { InternshipRepository } from './repositories/internship.repository';
// import taskRouter from './routes/task.routes';
// import userRouter from './routes/user.routes';
// import internshipRouter from './routes/internship.routes';
// import { errorHandler } from './middlewares/error.middleware';
// import { notFoundHandler } from './middlewares/not-found.middleware';
// import authRoutes from './routes/auth.routes';
// import 'dotenv/config';

// const PORT = process.env.PORT || 3000;

// // Create connection wrapper
// class Database {
//   static async ensureConnection() {
//     if (!AppDataSource.isInitialized) {
//       try {
//         await AppDataSource.initialize();
//         console.log('Database connected successfully');
//       } catch (error) {
//         console.error('Database connection error:', error);
//         throw error;
//       }
//     }
//     return AppDataSource;
//   }
// }

// export async function startServer() {
//   // Initialize database connection
//   try {
//     await Database.ensureConnection();
//   } catch (error) {
//     console.error('Failed to connect to database:', error);
//     process.exit(1);
//   }

//   const app = express();

//   // Initialize services and controllers
//   const userService = new UserService();
//   const userController = new UserController(userService);
  
//   const internshipRepository = new InternshipRepository();
//   const internshipService = new InternshipService(internshipRepository);

//   // Middlewares
//   app.use(cors());
//   app.use(bodyParser.json());
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));

//   // Add connection check middleware
//   app.use(async (req, res, next) => {
//     try {
//       await Database.ensureConnection();
//       next();
//     } catch (error) {
//       res.status(500).json({ error: 'Database connection failed' });
//     }
//   });

//   // Health check endpoint
//   app.get('/api/health', async (req, res) => {
//     try {
//       await AppDataSource.query('SELECT 1');
//       res.status(200).json({ status: 'OK', database: 'connected' });
//     } catch (error) {
//       res.status(500).json({ status: 'Unhealthy', database: 'disconnected' });
//     }
//   });

//   // Routes
//   app.use('/api/users', userRouter);
//   app.use('/api/tasks', taskRouter);
//   app.use('/api/internships', internshipRouter);
//   app.use('/auth', authRoutes);

//   // Error handling middlewares
//   app.use(notFoundHandler);
//   app.use(errorHandler);

//   const server = app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//     console.log(`Health check: http://localhost:${PORT}/api/health`);
//   });

//   // Graceful shutdown
//   const shutdown = async () => {
//     console.log('Shutting down gracefully...');
//     server.close(async () => {
//       if (AppDataSource.isInitialized) {
//         await AppDataSource.destroy();
//         console.log('Database connection closed');
//       }
//       process.exit(0);
//     });
//   };

//   process.on('SIGTERM', shutdown);
//   process.on('SIGINT', shutdown);

//   return server;
// }

// if (require.main === module) {
//   startServer().catch(error => {
//     console.error('Failed to start server:', error);
//     process.exit(1);
//   });
// }

//New Code 4
import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import { AppDataSource } from './database/data-source';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { InternshipService } from './services/internship.service';
import { InternshipRepository } from './repositories/internship.repository';
import taskRouter from './routes/task.routes';
import userRouter from './routes/user.routes';
import internshipRouter from './routes/internship.routes';
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/not-found.middleware';
import authRoutes from './routes/auth.routes';
import 'dotenv/config';
import { authenticate } from './middlewares/auth.middleware';


const PORT = process.env.PORT || 3000;

// Enhanced connection wrapper with retry logic
class Database {
  static async ensureConnection() {
    if (!AppDataSource.isInitialized) {
      const MAX_RETRIES = 5;
      const RETRY_DELAY = 5000; // 5 seconds
      let retryCount = 0;

      while (retryCount < MAX_RETRIES) {
        try {
          await AppDataSource.initialize();
          console.log('Database connected successfully');
          return AppDataSource;
        } catch (error) {
          retryCount++;
          console.error(`Database connection attempt ${retryCount} failed:`, error);
          
          if (retryCount < MAX_RETRIES) {
            console.log(`Retrying in ${RETRY_DELAY/1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          } else {
            throw new Error('Max database connection retries reached');
          }
        }
      }
    }
    return AppDataSource;
  }
}

export async function startServer() {
  // Initialize database connection with retry logic
  try {
    await Database.ensureConnection();
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }

  const app = express();

  // Initialize services and controllers
  const userService = new UserService();
  const userController = new UserController(userService);
  
  const internshipRepository = new InternshipRepository();
  const internshipService = new InternshipService(internshipRepository);

  // Middlewares
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Enhanced connection check middleware
  app.use(async (req, res, next) => {
    try {
      await Database.ensureConnection();
      next();
    } catch (error) {
      console.error('Database connection check failed:', error);
      res.status(503).json({ 
        status: 'Service Unavailable',
        message: 'Database connection failed',
        retryAfter: '30s'
      });
    }
  });

  // Health check endpoint with DB verification
  app.get('/api/health', async (req, res) => {
    try {
      await AppDataSource.query('SELECT 1');
      res.status(200).json({ 
        status: 'OK',
        services: {
          database: 'connected',
          memoryUsage: process.memoryUsage().rss / 1024 / 1024 + 'MB'
        },
        uptime: process.uptime()
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'Unhealthy',
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Public routes
  app.use('/auth', authRoutes);

  // Apply authentication middleware to all API routes
  app.use('/api', authenticate);

  // Protected API routes
  app.use('/api/users', userRouter);
  app.use('/api/tasks', taskRouter);
  app.use('/api/internships', internshipRouter);

  // Error handling middlewares
  app.use(notFoundHandler);
  app.use(errorHandler);

  // Start server
  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    console.log('JWT Secret:', process.env.JWT_SECRET);
  });

  // Enhanced graceful shutdown
  const shutdown = async (signal: string) => {
    console.log(`Received ${signal}. Shutting down gracefully...`);
    
    try {
      // Close server first to stop accepting new connections
      server.close(async () => {
        console.log('HTTP server closed');
        
        // Then close database connection if it exists
        if (AppDataSource.isInitialized) {
          await AppDataSource.destroy();
          console.log('Database connection closed');
        }
        
        console.log('Shutdown complete');
        process.exit(0);
      });

      // Force shutdown after timeout
      setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  };

  // Handle shutdown signals
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    shutdown('uncaughtException');
  });

  // Handle unhandled rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    shutdown('unhandledRejection');
  });

  return server;
}

if (require.main === module) {
  startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}