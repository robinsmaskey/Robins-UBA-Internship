"use strict";
// import express from 'express';
// import { ApolloServer } from '@apollo/server';
// import { expressMiddleware } from '@apollo/server/express4';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import { typeDefs } from './graphql/schema';
// import { resolvers } from './graphql/resolvers';
// import userRouter from './routes/task.routes';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
require("reflect-metadata");
const data_source_1 = require("./database/data-source");
const user_service_1 = require("./services/user.service");
const user_controller_1 = require("./controllers/user.controller");
const internship_service_1 = require("./services/internship.service");
const internship_repository_1 = require("./repositories/internship.repository");
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const internship_routes_1 = __importDefault(require("./routes/internship.routes")); // Make sure this import path is correct
const error_middleware_1 = require("./middlewares/error.middleware");
const not_found_middleware_1 = require("./middlewares/not-found.middleware");
const PORT = process.env.PORT || 3000;
async function startServer() {
    // Initialize database connection
    try {
        await data_source_1.AppDataSource.initialize();
        console.log('Database connected successfully');
    }
    catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
    const app = (0, express_1.default)();
    // Initialize services and controllers
    const userService = new user_service_1.UserService();
    const userController = new user_controller_1.UserController(userService);
    // Initialize internship dependencies
    const internshipRepository = new internship_repository_1.InternshipRepository();
    const internshipService = new internship_service_1.InternshipService(internshipRepository);
    // Middlewares
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // Health check endpoint
    app.get('/api/health', (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    // Routes
    app.use('/api/users', user_routes_1.default);
    app.use('/api/tasks', task_routes_1.default);
    app.use('/api/internships', internship_routes_1.default);
    // Error handling middlewares
    app.use(not_found_middleware_1.notFoundHandler);
    app.use(error_middleware_1.errorHandler);
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Tasks API: http://localhost:${PORT}/api/tasks`);
        console.log(`Users API: http://localhost:${PORT}/api/users`);
        console.log(`Internships API: http://localhost:${PORT}/api/internships`);
        console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
}
exports.startServer = startServer;
// Start the server if this file is run directly
if (require.main === module) {
    startServer().catch(error => {
        console.error('Failed to start server:', error);
        process.exit(1);
    });
}
