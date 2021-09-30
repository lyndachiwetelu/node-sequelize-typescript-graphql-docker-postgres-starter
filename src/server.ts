import schema from './graphql/schemasMap'
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import express, { Application, Request } from 'express';
import { GraphQLSchema } from 'graphql';
import { initDBConnection } from './database';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const port = process.env.PORT || 3000;

const createContext = (context: any) => (context)

async function startApolloServer(schema: GraphQLSchema) {
  const origins: any = process.env.ORIGINS || ''
  const allowlist = origins.split(',')
  const corsOptionsDelegate = (req: Request, callback: CallableFunction) => {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: allowlist[allowlist.indexOf(req.header('Origin'))], optionsSuccessStatus: 204,
        credentials: true } 
    } else {
      corsOptions = { origin: false } 
    }
    callback(null, corsOptions)
  }

  const server = new ApolloServer({schema, context: createContext});
  await server.start();
  const app: Application = express();
  app.use(cookieParser());
  app.use(cors(corsOptionsDelegate))

  server.applyMiddleware({
     app,
     path: '/graphql',
     cors: corsOptionsDelegate
  });
  
  app.listen({ port }, async () => {
    await initDBConnection()
    console.log(`🚀 GraphQL Server is now running on http://localhost:${port}${server.graphqlPath}`);
})

}

startApolloServer(schema);