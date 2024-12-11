import express from 'express';
import path from 'node:path';
import dotenv from 'dotenv';
import type { Request, Response } from 'express';
import db from './config/connection.js'
import { ApolloServer } from '@apollo/server';// Note: Import from @apollo/server-express
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js';
import apiRoutes from './routes/index.js';
import { fileURLToPath } from 'url';

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const startApolloServer = async () => {
  await server.start();
  await db();

  const PORT = process.env.PORT || 3001;
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server as any,
    {
      context: authenticateToken as any
    }
  ));

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, '../../client/dist');
    app.use(express.static(distPath));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.use(apiRoutes);

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
