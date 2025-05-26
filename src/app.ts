// import express from 'express';
// import { ApolloServer } from '@apollo/server';
// import { expressMiddleware } from '@apollo/server/express4';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import { typeDefs } from './graphql/schema';
// import { resolvers } from './graphql/resolvers';
// import userRouter from './routes/task.routes';


// const PORT = process.env.PORT || 3000;

// export async function startServer(){
//   const app = express();
//   app.use(express.json());
//   app.use("/api/tasks", userRouter);
//   const server = new ApolloServer({
//       typeDefs,
//       resolvers,
//     });
  
//     await server.start();
  
//     app.use(
//       '/graphql',
//       cors<cors.CorsRequest>(),
//       bodyParser.json(),
//       expressMiddleware(server)
//     );
//   app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });

// }
  
// //New App.ts
// import express from 'express';
// import { ApolloServer } from '@apollo/server';
// import { expressMiddleware } from '@apollo/server/express4';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import { typeDefs } from './graphql/schema';
// import { resolvers } from './graphql/resolvers';
// import userRouter from './routes/user.routes';
// import taskRouter from './routes/task.routes';
// import { errorHandler } from './middlewares/error.middleware';
// import { notFoundHandler } from './middlewares/not-found.middleware';
// import { AppDataSource } from './database/data-source';
// import 'reflect-metadata';

// const PORT = process.env.PORT || 3000;

// export async function startServer() {
//   // Initialize TypeORM Data Source
//   try {
//     await AppDataSource.initialize();
//     console.log('Database connected successfully');
//   } catch (error) {
//     console.error('Database connection error:', error);
//     process.exit(1);
//   }

//   const app = express();

//   // Apply common middlewares
//   app.use(cors());
//   app.use(bodyParser.json());
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));

//   // REST API Routes
//   app.use('/api/users', userRouter);
//   app.use('/api/tasks', taskRouter);

//   // Apollo GraphQL Server
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });

//   await server.start();

//   // GraphQL Endpoint
//   app.use(
//     '/graphql',
//     cors<cors.CorsRequest>(),
//     bodyParser.json(),
//     expressMiddleware(server)
//   );

//   // Error Handling Middlewares
//   app.use(notFoundHandler);
//   app.use(errorHandler);

//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//     console.log(`REST Users API: http://localhost:${PORT}/api/users`);
//     console.log(`REST Tasks API: http://localhost:${PORT}/api/tasks`);
//     console.log(`GraphQL API: http://localhost:${PORT}/graphql`);
//   });
// }

//New Code 2 
// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import 'reflect-metadata';
// import { AppDataSource } from './database/data-source';
// import { UserService } from './services/user.service';
// import { UserController } from './controllers/user.controller';
// import userRouter from './routes/user.routes';
// import { errorHandler } from './middlewares/error.middleware';
// import { notFoundHandler } from './middlewares/not-found.middleware';

// const PORT = process.env.PORT || 3000;

// export async function startServer() {
//   // Initialize database connection
//   try {
//     await AppDataSource.initialize();
//     console.log('Database connected successfully');
//   } catch (error) {
//     console.error('Database connection error:', error);
//     process.exit(1);
//   }

//   const app = express();

//   // Initialize services and controllers
//   const userService = new UserService();
//   const userController = new UserController(userService);

//   // Middlewares
//   app.use(cors());
//   app.use(bodyParser.json());
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));

//   // Routes
//   app.use('/api/users', userRouter);
 

//   // Error handling middlewares
//   app.use(notFoundHandler);
//   app.use(errorHandler);

//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//     console.log(`Users API: http://localhost:${PORT}/api/users`);
//     console.log(`Health check: http://localhost:${PORT}/api/health`);
//   });
// }

//New Code 3
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
// import internshipRouter from './routes/internship.routes'; // Make sure this import path is correct
// import { errorHandler } from './middlewares/error.middleware';
// import { notFoundHandler } from './middlewares/not-found.middleware';
// import authRoutes from './routes/auth.routes';
// import 'dotenv/config';

// const PORT = process.env.PORT || 3000;

// export async function startServer() {
//   // Initialize database connection
//   try {
//     await AppDataSource.initialize();
//     console.log('Database connected successfully');
//   } catch (error) {
//     console.error('Database connection error:', error);
//     process.exit(1);
//   }

//   const app = express();

//   // Initialize services and controllers
//   const userService = new UserService();
//   const userController = new UserController(userService);
  
//   // Initialize internship dependencies
//   const internshipRepository = new InternshipRepository();
//   const internshipService = new InternshipService(internshipRepository);

//   // Middlewares
//   app.use(cors());
//   app.use(bodyParser.json());
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));

//   // Health check endpoint
//   app.get('/api/health', (req, res) => {
//     res.status(200).json({ status: 'OK' });
//   });

//   // Routes
//   app.use('/api/users', userRouter);
//   app.use('/api/tasks', taskRouter);
//   app.use('/api/internships', internshipRouter);
//   app.use('/auth', authRoutes);

//   // Error handling middlewares
//   app.use(notFoundHandler);
//   app.use(errorHandler);

//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//     console.log(`Tasks API: http://localhost:${PORT}/api/tasks`)
//     console.log(`Users API: http://localhost:${PORT}/api/users`);
//     console.log(`Internships API: http://localhost:${PORT}/api/internships`);
//     console.log(`Login API: http://localhost:${PORT}/auth`);
//     console.log(`Health check: http://localhost:${PORT}/api/health`);
//   });
// }

// // Start the server if this file is run directly
// if (require.main === module) {
//   startServer().catch(error => {
//     console.error('Failed to start server:', error);
//     process.exit(1);
//   });
// }

//New Code 4
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

const PORT = process.env.PORT || 3000;

// Create connection wrapper
class Database {
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

export async function startServer() {
  // Initialize database connection
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

  // Add connection check middleware
  app.use(async (req, res, next) => {
    try {
      await Database.ensureConnection();
      next();
    } catch (error) {
      res.status(500).json({ error: 'Database connection failed' });
    }
  });

  // Health check endpoint
  app.get('/api/health', async (req, res) => {
    try {
      await AppDataSource.query('SELECT 1');
      res.status(200).json({ status: 'OK', database: 'connected' });
    } catch (error) {
      res.status(500).json({ status: 'Unhealthy', database: 'disconnected' });
    }
  });

  // Routes
  app.use('/api/users', userRouter);
  app.use('/api/tasks', taskRouter);
  app.use('/api/internships', internshipRouter);
  app.use('/auth', authRoutes);

  // Error handling middlewares
  app.use(notFoundHandler);
  app.use(errorHandler);

  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });

  // Graceful shutdown
  const shutdown = async () => {
    console.log('Shutting down gracefully...');
    server.close(async () => {
      if (AppDataSource.isInitialized) {
        await AppDataSource.destroy();
        console.log('Database connection closed');
      }
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

  return server;
}

if (require.main === module) {
  startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}