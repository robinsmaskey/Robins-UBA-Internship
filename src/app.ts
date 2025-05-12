import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import cors from 'cors';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import userRouter from './routes/task.routes'


const PORT = process.env.PORT || 3000;

export async function startServer(){
  const app = express();
  app.use(express.json());
  app.use("/api/tasks", userRouter);
  const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
  
    await server.start();
  
    app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      bodyParser.json(),
      expressMiddleware(server)
    );
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

}
  
